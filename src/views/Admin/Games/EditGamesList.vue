<template>
  <div>
    <div class="banner">
      <img src="/images/games.png" alt="" />
      <h1>{{ gamesListsId }}</h1>
    </div>
    <div class="breadcrumbs">
      <router-link to="/games">Games</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <a href="/games/games-lists">Games Lists</a>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">{{ gamesListsId }}</span>
    </div>
    <form action="">
      <div class="card">
        <label for="">List Name</label>
        <input v-model="listName"  type="text"/>
        <label for="">Add Game</label>
        <div class="search-field-container">
          <input type="text" name="name" placeholder="Brand Casino" class="search-field"/>
          <span>
            <img src="/images/svg/search-24.svg" alt="search">
          </span>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Provider <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Id <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Category <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="allGames.length > 0">
              <tr v-for="(game, index) in allGames" :key="index">
                <td>{{ game.name }}</td>
                <td>
                  <div class="provider-logo-container">
                    <img :src="game.providerImage" class="provider-logo" alt="" />
                  </div>
                </td>
                <td>{{ game.gameId }}</td>
                <td>
                  <div class="category-logo-container">
                    <div :style="{ background: game?.background }" class="category-logo">
                      <img :src="game.categoryIcon" :style="{ color: 'red' }" style="height: 100%" alt=""/>
                    </div>
                    <div>Slot</div>
                  </div>
                </td>
                <td>
                  <a :href="`/games/edit-game/${game.gameId}`">Edit</a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr ><td colspan="5" style="text-align: center;">No games found.</td></tr>
            </tbody>
          </table>
          <div class="pagination">
            <div class="pagination-text">Showing 1 to 20 of 2100 entries</div>
            <div class="pagination-btns">
              <button class="previous disabled">Previous</button>
              <button class="num-btn active">1</button>
              <button class="num-btn">2</button>
              <button class="num-btn">3</button>
              <button class="num-btn">4</button>
              <button class="next">Next</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-btn-container">
        <button class="btn-xl">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { COLORS } from "@/utils";
import {SortingIcon} from '@/utils';

const route = useRoute();
const selectedColor = ref(null);
const gamesListsId = ref("")
const allGames = ref([
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "images/slotIcon1.svg",
    background: "#D7F5FC"
  },
  {
    name: "Book of Shadows2",
    providerName: "proveider name",
    providerImage: "images/game2.png",
    gameId: "game2",
    categoryName: "Multiple",
    categoryIcon: "images/slotIcon2.svg",
    background: "#FFF2D6"
  },
  {
    name: "Book of Shadows3",
    providerName: "proveider name",
    providerImage: "images/game3.png",
    gameId: "game3",
    categoryName: "Live",
    categoryIcon: "images/slotIcon3.svg",
    background: "#E7E7FF"
  },
  {
    name: "Book of Shadows1",
    providerName: "proveider name",
    providerImage: "images/game1.png",
    gameId: "game1",
    categoryName: "Slots",
    categoryIcon: "images/slotIcon1.svg",
    background: "#D7F5FC"
  },
]);
const colors = ref(COLORS);

onMounted(() => {
  gamesListsId.value = route.params.id;
  setLogo(allGames.value);
});

const setLogo = (gameList) => {
  gameList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.categoryLogo = selectedColor.value;
  });
};
</script>
