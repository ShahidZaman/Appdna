<template>
  <div class="brands">
    <div class="banner">
      <img src="/images/brands.png" alt="" />
      <h1>Brands</h1>
    </div>
    <div class="desktop-view">
      <div class="right-btn-container">
        <button @click="showModal('', 'create')" class="btn-lg">
          <img src="/images/svg/plus-24.svg" alt="plus">
          Create Brand
        </button>
      </div>
    </div>
    <div class="mobile-view">
      <button v-if="!isCreateBrand" @click="isCreateBrand = true" class="button create-brand-btn"> + Create Brand </button>
      <div v-if="isCreateBrand" class="card">
        <form action="">
          <input type="text" placeholder="Brand Name" />
          <input type="text" placeholder="Brand ID" />
          <input type="text" placeholder="Website" />
          <button @click="isCreateBrand = false" type="button" class="cancel btn-sm">
            Cancel
          </button>
          <button type="submit" class="button btn-sm">Create</button>
        </form>
      </div>
    </div>
    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Id <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Website <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="brands.length > 0">
              <tr v-for="(brand, index) in brands" :key="index">
                <td>
                  <div class="brand-name-container">
                    <div v-if="brand.iconUrl" class="img-container">
                      <img :src="brand.iconUrl" alt="">
                    </div>
                    <div v-else :style="{color: brand.defaultLogo.color, background: brand.defaultLogo.background}" class="brand-name-logo">
                      {{ capitalizeFirstLetter(brand.name[0]) }}
                    </div>
                    <div>
                      {{ brand.name }}
                    </div>
                  </div>
                </td>
                <td>
                  <a @click.prevent="setTenant(brand.key, brand.name, brand.iconUrl)" href="">{{ brand.key }}</a>
                </td>
                <td>{{ brand.website }}</td>
                <td>
                  <a @click="editBrand(brand.key)" href="javascript:void(0)">
                    Manage
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr ><td colspan="3" style="text-align: center;">No brands found.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <teleport to="body">
        <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
          <div v-if="modalType === 'create'" class="detail-modal create-brand">
            <div @click="closeModal" class="cross-button-banner-modal">
              <img src="/images/svg/close-32.svg" alt="close">
            </div>
            <div class="modal-banner">
              <h1>Create Brand</h1>
            </div>
            <div class="modal-contant-container">
              <div class="logo-section">
                <div class="relative">
                  <div v-if="newLogo" class="logo-container">
                    <img src="/images/test-logo.jpg" alt="logo" class="logo-img"/>
                  </div>
                  <div v-else class="alphabet">A</div>
                  <div @click="showModal('', 'uploadImg')" class="edit-icon">
                    <img src="/images/svg/edit-32.svg" alt="edit">
                  </div>
                </div>
              </div>
              <form @submit.prevent="onCreateBrand">
                <label for="name">NAME</label>
                <input v-model="brandName" type="text" placeholder="Brand Casino" required/>
                <label for="name">ID</label>
                <input v-model="brandId" type="text" placeholder="Brand" required/>
                <label for="name">WEBSITE</label>
                <input v-model="brandUrl" type="text" placeholder="brandcasino.com" required/>
                <div class="listButtons">
                  <button @click="closeModal" type="button" class="cancel">
                    Cancel
                  </button>
                  <button type="submit">Create</button>
                </div>
              </form>
            </div>
          </div>

          <div v-if="modalType === 'uploadImg'" class="upload-logo-modal">
            <div @click="closeModal" class="cross-button-banner-modal">
              <img src="/images/svg/close-32.svg" alt="close">

            </div>
            <div class="modal-banner">
              <h1>Upload Logo</h1>
            </div>
            <div class="modal-contant-container">
              <div class="logo-container">
                <div class="logo-up-container">
                  <img :src="newLogo ? newLogo : '/images/test-logo.jpg'" class="logo-img" alt=""/>
                </div>
                <div class="upload-btn">
                  <label>
                    Upload new photo
                    <input @change="uploadImg" type="file" ref="file" accept="image/gif, image/jpeg, image/png" hidden />
                  </label>
                </div>

                <div class="listButtons">
                  <button @click="closeModal" class="button cancel">
                    Cancel
                  </button>
                  <button class="button">Save</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </teleport>
    </div>
    <div v-if="brands" class="mobile-view">
      <div v-for="(brand, index) in brands" :key="index" class="card">
        <div class="mobile-brand-name-container">
          <div :style="{color: brand.defaultLogo.color, background: brand.defaultLogo.background}" @click="showModal('', 'uploadImg')" class="brand-name-logo">
            {{ capitalizeFirstLetter(brand.name[0]) }}
          </div>
          <div class="brand-name">
            {{ brand.name }}
          </div>
        </div>
        <div class="website">
          {{ brand.website }}
        </div>
        <div class="brand-id">
          Brand ID: {{ brand.key }}
        </div>
        <div class="buttons">
          <button @click="editBrand(brand.key)" class="manage">
            Manage
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import { ref, watchEffect} from "vue";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router/index";
import api from "@/api/api";
import {SortingIcon, capitalizeFirstLetter} from '@/utils';

const authStore = useAuthStore();
const modalType = ref(null);
const isModalVisible = ref(false);
const brands = ref([]);
const newLogo = ref("");
const brandName = ref("");
const brandId = ref("");
const brandUrl = ref("");
const isCreateBrand = ref(false);
watchEffect(() => {
  if (authStore.loggedIn) {
    brands.value = authStore.allTenants;
  }
});

const editBrand = (id) => {
  router.push(`/brands/${id}`);
};

async function setTenant(tenantId, name, icon) {
  authStore.setTenant(tenantId, name, icon);
  router.push("/");
}

const showModal = (data, type) => {
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const onCreateBrand = () => {
  if (brandId.value && brandName.value && brandUrl.value) {
    createBrand(brandName.value, brandId.value, brandUrl.value);
  }
};

const createBrand = async (name, id, url) => {
  const response = await api.tenants.createTenant(name, id, url);
  if (response.status === 200) {
    brands.value = authStore.allTenants;
  }
  closeModal();
};

const uploadImg = (e) => {
  newLogo.value = e.target.files[0].name;
  const file = e.target.files;
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      newLogo.value = event.target.result;
    };
    fileReader.readAsDataURL(file[0]);
  }
};
</script>
