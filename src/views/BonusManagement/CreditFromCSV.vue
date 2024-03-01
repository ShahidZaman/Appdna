<template>
    <div>
        <div class="banner">
            <img src="/images/players.png" alt="" />
            <h1>Credit from CSV</h1>
        </div>
        <div class="card csv-container">
            <div class="csv-img-container">
                <div class="csv-form-container">
                    <form @submit.prevent="submitBonus">
                        <div class="bonus-form">
                            <div class="form-group">
                                <div>
                                    <label for="currency">CURRENCY</label>
                                    <SelectDropdown :dataList="optionsList" @selected="handleSelected" :customStyle="dropdownStyle" position="absolute" name="currency" />
                                </div>
                                <div>
                                    <label for="expiers">EXPIRES (IN DAYS)</label>
                                    <input v-model="expireInDays" type="number" placeholder="0">
                                </div>
                            </div>
                            <div>
                                <label for="game">Game</label>
                                <div class="search">
                                    <input v-model="searchGame" type="text" placeholder="Search...">
                                    <img src="/images/svg/search-24.svg" alt="search">
                                </div>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="spins">NUMBER OF SPINS</label>
                                    <input v-model="numberOfSpins" type="number" placeholder="5">
                                </div>
                                <div>
                                    <label for="freespins">VALUE OF FREE SPIN</label>
                                    <input v-model="freeSpins" type="number" placeholder="10">
                                </div>
                            </div>
                            <div class="upload-btn-container">
                                <button class="btn-lg">
                                    <img src="/images/svg/Download-24.svg" alt="download">
                                    Upload
                                </button>
                                <p>You can upload any .CSV file with any set of column as long as it has 1 record per row.</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="right-btn-container">
            <button type="submit" class="btn-xl">Save</button>
        </div>
    </div>
</template>

<script setup>
import SelectDropdown from "@/components/SelectDropdown.vue";
import { ref } from "vue";

const expireInDays = ref(null)
const searchGame = ref(null)
const numberOfSpins = ref(null)
const freeSpins = ref(null)
const optionsList = [
    {
        name: "$",
        id: 1,
    },
    {
        name: "¥",
        id: 2,
    },
    {
        name: "£",
        id: 3,
    },
];
const dropdownStyle = {
    minWidth: '0px !important',
    width: '100%'
}
const selectedOption = ref({
    currency: "",
});

const handleSelected = (options) => {
    const { option, name } = options
    selectedOption.value[name] = option;
};
</script>