<template>
  <div>
    <div class="games">
      <div class="banner">
        <img src="/images/games.png" alt="" />
        <h1>Games</h1>
      </div>
      <div class="games-btns">
        <router-link to="/games/games-lists">
          <button class="btn-lg">
            <img src="/images/svg/list-24.svg" alt="list">
            Games Lists
          </button>
        </router-link>
      </div>
      <div class="card">
        <form>
          <div class="search-game-form">
            <div class="horizontal-form-container">
              <div class="input-fields">
                <div class="input-field-container">
                  <label for="">Provider</label>
                  <SelectDropdown :dataList="optionsList" @selected="handleSelected" position="absolute" name="provider"/>
                </div>
                <div class="input-field-container">
                  <label for="">Name</label>
                  <input v-model="gameName" type="text" placeholder="Game1" class="input-field"/>
                </div>
              </div>
              <div class="buttons">
                <button class="cancel" type="button">Clear</button>
                <button @click="submitForm" class="button search" type="button">Search</button>
              </div>
            </div>
          </div>
        </form>
        <div class="hr"></div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Provider <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Id <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Free Spins <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Minimum Bet <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Category <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              </tr>
            </thead>
            <tbody v-if="allGames.length > 0">
              <tr v-for="(game) in allGames" :key="game.externalId">
                <td>{{ game.name }}</td>
                <td>
                  <div class="provider-logo-container">
                    <img :src="categories.find(c => c.categoryName.toLocaleLowerCase() === game.category.toLocaleLowerCase())?.providerImage" class="provider-logo" alt=""/>
                  </div>
                </td>
                <td>{{ game.externalId }}</td>
                <td>
                  <img src="/images/svg/check-green-r.svg" alt="check" v-if="game.id % 2 === 0">
                  <img src="/images/svg/cross-red-r.svg" alt="cross" v-else>
                </td>
                <td>£0.10</td>
                <td>
                  <div class="category-logo-container">
                    <div :style="{ background: categories.find(c => c.categoryName.toLocaleLowerCase() === game.category.toLocaleLowerCase())?.background}" class="category-logo" >
                      <img :style="{ color: 'red' }"  :src="categories.find(c => c.categoryName.toLocaleLowerCase() === game.category.toLocaleLowerCase())?.categoryIcon" style="height: 100%" alt="" />
                    </div>
                    {{ capitalizeFirstLetter(game.category) }}
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr ><td colspan="6" style="text-align: center;">No games found.</td></tr>
            </tbody>
          </table>
        </div>
       
        <div class="pagination">
          <div class="pagination-text">Showing {{(pageSize * (currentPage - 1)) + 1}} to {{ rowCount > pageSize ? pageSize * currentPage : rowCount}} of {{rowCount}} entries</div>
          <div class="pagination-btns">
            <button @click.prevent="prevPage" class="previous">Previous</button>
            <template v-if="pageCount <= 5">
              <button v-for="index in pageCount" :key="index" @click.prevent="setPage(index)" :class="{active: index==currentPage}" class="num-btn">{{index}}</button>
            </template>
            <template v-if="pageCount > 5">
              <button @click.prevent="setPage(1)" :class="{active: currentPage==1}" class="num-btn">1</button>
              <button v-if="currentPage-1 > 2" class="num-btn">...</button>
              <button v-if="currentPage-1 > 1" @click.prevent="setPage(currentPage-1)" class="num-btn">{{currentPage - 1}}</button>
              <button v-if="currentPage > 1 && currentPage < pageCount" class="num-btn active">{{currentPage}}</button>
              <button v-if="currentPage+1 < pageCount" @click.prevent="setPage(currentPage+1)" class="num-btn">{{currentPage + 1}}</button>
              <button v-if="currentPage+2 < pageCount" @click.prevent="setPage(currentPage+2)" class="num-btn">{{currentPage + 2}}</button>
              <button v-if="currentPage+1 < pageCount-2" class="num-btn">...</button>
              <button @click.prevent="setPage(pageCount)" :class="{active: currentPage==pageCount}" class="num-btn">{{pageCount}}</button>
            </template>
            <button @click.prevent="nextPage" class="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SelectDropdown from "@/components/SelectDropdown.vue"
import api from "@/api/api";
import { capitalizeFirstLetter } from "@/utils"
import {SortingIcon} from '@/utils';

const gameName = ref('');
const provider = ref('');
const currentPage = ref(1);
const pageCount = ref(1);
const rowCount = ref(0);
const pageSize = ref(10);
const allGames = ref([]);
const optionsList = [
  {
    name: "Option 1",
    id: 1,
  },
  {
    name: "Option 2",
    id: 2,
  },
  {
    name: "Option 3",
    id: 3,
  },
  {
    name: "Option 4",
    id: 4,
  },
];
const selectedOption = ref({
  provider: "",
});

const handleSelected = (options) => {
  const {option, name} = options 
  selectedOption.value[name] = option;
};

const submitForm = () => {
  console.log("at submit ",selectedOption.value, gameName.value);
}

onMounted(async () => {
  await getGames();
});

const getGames = async () => {
  // TODO pass provider from dropdown box and name from search box and page from pagination control
  const response = await api.games.getGames(provider.value, gameName.value, currentPage.value);
  allGames.value = response.data.game;
  pageCount.value = response.data.pageCount;
  rowCount.value = response.data.rowCount;
};

// An array to define categories data
  const categories = [
        {
            categoryName: "Multiple",
            categoryIcon: "/images/slotIcon2.svg",
            background: "#FFF2D6",
            providerImage: "/images/game1.png",
        },
        {
            categoryName: "Live",
            categoryIcon: "/images/slotIcon3.svg",
            background: "#E7E7FF",
            providerImage: "/images/game1.png",
        },
        {
            categoryName: "Slots",
            categoryIcon: "/images/slotIcon1.svg",
            background: "#D7F5FC",
            providerImage: "/images/game1.png",
        }
    ]

// Pagination
const prevPage = async () => {
  if(currentPage.value > 1)
  {
    currentPage.value--;
    await getGames();
  }
}

const nextPage = async () => {
  if(currentPage.value < pageCount.value)
  {
    currentPage.value++;
    await getGames();
  }
}

const setPage = async (index) => {
  currentPage.value = index;
  if(currentPage.value < 1) currentPage.value = 1;
  if(currentPage.value > pageCount) currentPage.value = pageCount;
  await getGames();
}
</script>
