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
            <h4>Forgot your password? <img src="/images/Lock.png" alt="lock"></h4>
            <p>No worries. Enter your email address and we will send you a link to reset your password.</p>
            <form @submit.prevent="forgotPassword" autocomplete="off">
                <label for="email">Email</label>
                <input v-model="email" type="email" placeholder="Enter your email address">
                <button type="submit" class="btn-lg">Send Link</button>
            </form>
            
            <div class="back-to-login">
                <img src="/images/svg/chevron-left.svg" alt="chevron-left">
                <router-link to="/login">
                    Back to Login 
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";

const email = ref("");

async function forgotPassword() {
    console.log("Email: ",email)
}
</script>
  