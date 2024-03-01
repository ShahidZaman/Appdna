<template>
  <div>
    <div class="banner">
      <img src="/images/players.png" />
      <h1>Players</h1>
    </div>
    <div class="card">
      <div class="fliters-container">
        <div @click="showFilters = !showFilters" class="filters-header">
          <div class="filter">
            <img src="/images/svg/filter-32.svg" alt="filter">
            <p>Filter</p>
          </div>
          <div>
            <img :style="[showFilters ? { rotate: '180deg' } : { rotate: '0deg' }]" src="/images/svg/chevron-down-32.svg" alt="filter">
          </div>
        </div>
        <form v-if="showFilters" class="filter-form">
          <div class="filters-container">
            <div>
              <label for="id">ID</label>
              <input v-model="idFilter" type="text" placeholder="123456"/>
            </div>
            <div>
              <label for="id">SIGNUP DATE</label>
              <DatePicker :getDate="signupDate" ref="signupDateFilterRef"/>
            </div>
            <div>
              <label for="id">SIGNUP CODE</label>
              <input v-model="signupCodeFilter" type="text" placeholder="promo1"/>
            </div>
            <div>
              <label for="id">LAST BET</label>
              <DatePicker :getDate="lastBetDate" ref="lastBetFilterRef"/>
            </div>
            <div>
              <label for="id">GGR</label>
              <input v-model="ggrFilter" type="text" placeholder="1.23"/>
            </div>
            <div>
              <label for="id">WAGER</label>
              <input v-model="wagerFilter" type="text" placeholder="1.23"/>
            </div>
            <div>
              <label for="id">LAST DEPOSIT DATE</label>
              <DatePicker :getDate="lastDepositDate" ref="lastDepositFilterRef"/>
            </div>
            <div class="buttons">
              <button @click.prevent="clearFilters" class="cancel">Clear</button>
              <button @click.prevent="filterPlayers" class="button search">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><span>ID <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th><span>Signup Date <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th><span>Signup Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th><span>Total Deposit <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th><span>Total Wager <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th><span>Total GGR <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
            </tr>
          </thead>
          <tbody v-if="players.length > 0">
            <tr v-for="(player, index) in players" :key="index">
              <td>
                <router-link :to="{ name: 'player-details', params: { id: player.externalId }}">{{player.externalId}}</router-link>
              </td>
              <td>{{formatDate(player.signupDate)}}</td>
              <td>{{player.signupPromoCode}}</td>
              <td>£{{addCommas(player.totalDeposited)}}</td>
              <td>£{{addCommas(player.totalWager)}}</td>
              <td :style="[player.totalGGR < 0 ? { color: '#FF3E1D' } : { color: '#82E14F' }]" class="ggr">£{{addCommas(player.totalGGR)}}</td>
            </tr>
          </tbody>
          <tbody v-else>
              <tr ><td colspan="6" style="text-align: center;">No players found.</td></tr>
            </tbody>
        </table>
      </div>

      <div class="pagination">
        <div class="pagination-text">Showing {{(pageSize * (currentPage -  1)) +  1}} to {{ rowCount > pageSize ? pageSize * currentPage : rowCount}} of {{rowCount}} entries</div>
        <div class="pagination-btns">
          <button @click.prevent="prevPage" class="previous">Previous</button>
          <button v-for="(number, index) in pageNumbers" :key="index" @click.prevent="number !== '...' && setPage(number)" :class="{active: number === currentPage, ellipsis: number === '...'}" class="num-btn">{{ number !== '...' ? number : '...' }}</button>
          <button @click.prevent="nextPage" class="next">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';

  export default {
    components: { DatePicker },
  };
</script>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/api/api";
import { formatDate, addCommas, paginationPageNumbers} from "@/utils";
import {SortingIcon} from '@/utils';

const showFilters = ref(false);
const players = ref([]);
const idFilter = ref('');
const signupDateFilter = ref('');
const signupDateFilterRef = ref(null);
const signupCodeFilter = ref('');
const lastBetFilter = ref('');
const lastBetFilterRef = ref(null);
const ggrFilter = ref('');
const wagerFilter = ref('');
const lastDepositFilter = ref('');
const lastDepositFilterRef = ref(null);
const pageCount = ref(1);
const rowCount = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);

const signupDate = (date) => {
  signupDateFilter.value = date.formattedDate;
}

const lastBetDate = (date) => {
  lastBetFilter.value = date.formattedDate;
}

const lastDepositDate = (date) => {
  lastDepositFilter.value = date.formattedDate;
}

onMounted(async () => {
  await getPlayers();
});

const getPlayers = async () => {
  const response = await api.players.getPlayers(idFilter.value, signupDateFilter.value, signupCodeFilter.value, lastBetFilter.value, ggrFilter.value, wagerFilter.value, lastDepositFilter.value, currentPage.value);
  players.value = response.data.players;
  pageCount.value = response.data.pageCount;
  rowCount.value = response.data.rowCount;
};

const filterPlayers = async () => {
  currentPage.value=1;
  await getPlayers();
}

const clearFilters = async () => {
  currentPage.value = 1;
  idFilter.value = '';
  signupDateFilter.value = '';
  signupCodeFilter.value = '';
  lastBetFilter.value = '';
  ggrFilter.value = '';
  wagerFilter.value = '';
  lastDepositFilter.value = '';
  signupDateFilterRef.value.reset();
  lastBetFilterRef.value.reset();
  lastDepositFilterRef.value.reset();
  await getPlayers();
}

const prevPage = async () => {
  if(currentPage.value > 1)
  {
    currentPage.value--;
    await getPlayers();
  }
}

const nextPage = async () => {
  if(currentPage.value < pageCount.value)
  {
    currentPage.value++;
    await getPlayers();
  }
}

const setPage = async (index) => {
  currentPage.value = index;
  if(currentPage.value < 1) currentPage.value = 1;
  if(currentPage.value > pageCount) currentPage.value = pageCount;
  await getPlayers();
}

const pageNumbers = computed(() => paginationPageNumbers(pageCount, currentPage));
</script>
