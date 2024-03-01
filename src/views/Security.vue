<template>
  <AccountMenu/>
  <div class="card-wrapper">
    <div class="card">
      <h1>Change Password</h1>
      <form @submit.prevent="changePassword" method="post" autocomplete="off">
        <input v-model="oldPassword" type="password" placeholder="Old Password">
        <input v-model="newPassword" type="password" placeholder="New Password">
        <input v-model="confirmPassword" type="password" placeholder="Confirm New Password">
        <button type="submit">Save</button>
      </form>
    </div>

    <div class="card">
      <h1>{{ authStore.tfaEnabled ? 'Disable' : 'Enable' }} 2fa</h1>
      <form @submit.prevent="toggleTfa" method="post" autocomplete="off">
        <div v-if="!authStore.tfaEnabled">
          <p>Backup code: {{ tfaKey }}</p>
          <qrcode-vue :value="tfaUri" :size="150" level="H" />
        </div>
        <input v-model="tfaToken" type="text" placeholder="2FA Code">
        <button type="submit">Toggle</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue';
import api from '@/api/api';
import { useAuthStore } from '@/stores/authStore';
import AccountMenu from '@/components/AccountMenu.vue';

const authStore = useAuthStore();
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const tfaKey = ref('');
const tfaToken = ref('');
const tfaUri = ref('');


onMounted(async () => {
  if (!authStore.tfaEnabled) {
    const response = await api.auth.getTfaCode();
    tfaKey.value = response.data.tfaKey;
    tfaUri.value = response.data.uri;
    tfaToken.value = '';
  }
});

async function toggleTfa() {
  const response = await api.auth.toggleTfa(tfaToken.value);
  if (response.status == 200) {
    tfaKey.value = '';
    tfaUri.value = '';
    tfaToken.value = '';
    authStore.toggleTfa();
    // TODO return this with the first request
    if (!authStore.tfaEnabled) {
      const response = await api.auth.getTfaCode();
      tfaKey.value = response.data.tfaKey;
      tfaUri.value = response.data.uri;
    }
  }
}

async function changePassword() {
  // TODO validation
  const response = await api.auth.changePassword(oldPassword.value, newPassword.value);
  if (response.status == 200) {
    alert('success');
  } else {
    alert('false');
  }
}
</script>