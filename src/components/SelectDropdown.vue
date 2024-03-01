<template>
  <div>
    <div class="custom-select-container">
      <div :class="{ 'focused': isFocused, 'no-outline': !props.isOutline }"  @click="toggleDropdown" :style="props.customStyle" @focusout="handleClose" class="custom-select" tabindex="0">
        <div v-if="!selectedOption" class="default-option">
          Select an option
        </div>
        <div v-else class="selected-option">
          {{ selectedOption }}
        </div>
      </div>
      <div @click="toggleDropdown(true)" class="dropdown-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path :class="{ 'focused-dropdown': isFocused }" d="M17.2656 7.63281L12 12.8985L6.73436 7.63281L5 9.36717L12 16.3672L19 9.36717L17.2656 7.63281Z" fill="#B4BDC6" />
        </svg>
      </div>
      <div v-if="isFocused" :style="{ position: props.position }" class="options-list">
        <div v-for="option in props.dataList" @click="selectOption(option.name)" :key="option.name" class="custom-option">
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
const emits = defineEmits(['selected']);
const props = defineProps({
  position: String,
  name: String,
  customStyle: Object,
  dataList: Array,
  isOutline: {
    default: true,
    type: Boolean
  }
});
const isFocused = ref(false);
const selectedOption = ref("");

const selectOption = (option) => {
  selectedOption.value = option;
  nextTick(() => {
    emits('selected', { option, name: props.name });
    handleClose();
  });
};

const handleClose = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 250);
};

const toggleDropdown = (icon) => {
  isFocused.value = !isFocused.value;
  if (icon && isFocused.value) {
    const dropdownElement = document.querySelector('.custom-select');
    dropdownElement.focus();
  }
};
</script>