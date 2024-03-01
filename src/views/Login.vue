<template>
  <div class="auth-container">
    <div class="left-container"></div>
    <div class="right-container">
      <div class="header">
        <div class="logo-container">
          <img src="/images/app_logo_lg.png" alt="" />
        </div>
        <h2>DNA Bonus Engine</h2>
      </div>
      <h4>Welcome to our back office <img src="/images/wave-hand.png" alt="hand"></h4>
      <p>Please sign-in to your account to access all our features</p>
      <form @submit.prevent="login" autocomplete="off">
        <label for="">USERNAME</label>
        <input v-model="userName" type="text" placeholder="Username"/>
        <label for="">PASSWORD</label>
        <div class="password">
          <input v-model="password" :type="passwordType" placeholder="Password">
          <img v-if="passwordType === 'password'" @click="togglePasswordType" src="/images/svg/show.svg" alt="">
          <img v-else @click="togglePasswordType" src="/images/svg/hide.svg" alt="">
        </div>
        <div class="right-btn-container">
          <router-link to="/forgot-password">
            Forgot Password?
          </router-link>
        </div>
        <button type="submit" class="btn-lg">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index";
import api from "@/api/api";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const userName = ref("");
const password = ref("");
const passwordType = ref('password');

async function login() {
  // TODO validation
  const response = await api.auth.login(userName.value, password.value);
  if (response.status == 200) {
    authStore.login(response.data);
    router.push("/");
  }
}

const togglePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
}
</script>
