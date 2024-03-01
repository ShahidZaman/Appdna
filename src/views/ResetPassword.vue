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
            <h4>Reset your password <img src="/images/Lock.png" alt="lock"></h4>
            <p>Your new password must be different from previously used passwords.</p>
            <form @submit.prevent="resetPassword" autocomplete="off">
                <label for="">New Password</label>
                <div class="password">
                    <input v-model="newPassword" :type="newPasswordType" placeholder="Password">
                    <img v-if="newPasswordType === 'password'" @click="toggleNewPasswordType" src="/images/svg/show.svg" alt="">
                    <img v-else @click="toggleNewPasswordType" src="/images/svg/hide.svg" alt="">
                </div>
                <label for="">Confirm Password</label>
                <div class="password">
                    <input v-model="confirmPassword" :type="confirmPasswordType" placeholder="Password">
                    <img v-if="confirmPasswordType === 'password'" @click="toggleConfirmPasswordType" src="/images/svg/show.svg" alt="">
                    <img v-else @click="toggleConfirmPasswordType" src="/images/svg/hide.svg" alt="">
                </div>
                <button type="submit" class="btn-lg">Reset Password</button>
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

const newPassword = ref("");
const confirmPassword = ref("");
const newPasswordType = ref('password');
const confirmPasswordType = ref('password');

async function resetPassword() {
    console.log("Passwords: ", newPassword.value, confirmPassword.value);
}

const toggleNewPasswordType = () => {
    newPasswordType.value = newPasswordType.value === 'password' ? 'text' : 'password';
}

const toggleConfirmPasswordType = () => {
    confirmPasswordType.value = confirmPasswordType.value === 'password' ? 'text' : 'password';
}
</script>
  