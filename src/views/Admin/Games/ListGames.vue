<template>
  <div>
    <div class="banner">
      <img src="/images/games.png" alt="" />
      <h1>Games Lists</h1>
    </div>
    <div class="breadcrumbs">
      <router-link to="/games">Games</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">Games Lists</span>
    </div>
    <div class="right-btn-container">
      <router-link to="/games/create-game-list">
        <button class="btn-lg">
          <img src="/images/svg/plus-24.svg" alt="plus">
          Add New Games List
        </button>
      </router-link>
    </div>
    <div class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><span>List Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="lists.length > 0">
            <tr v-for="list in lists" :key="list.id">
              <td>{{ list.name }}</td>
              <td>
                <a :href="`/games/edit-game-list/${list.id}`">View</a>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
              <tr ><td colspan="2" style="text-align: center;">No list found.</td></tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api/api";
import {SortingIcon} from '@/utils';

const lists = ref([]);

onMounted(async () => {
  await getLists();
});

const getLists = async () => {
  const response = await api.games.getGameLists();
  lists.value = response.data.lists;
};

</script>
