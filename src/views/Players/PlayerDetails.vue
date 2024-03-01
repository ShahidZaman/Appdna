<template>
  <div>
    <div class="banner">
      <img src="/images/players.png" alt="player" />
      <h1>Player: {{ playerId }}</h1>
    </div>
    <div class="breadcrumbs">
      <router-link to="/players">Players</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">Player {{ playerId }}</span>
    </div>
    <div class="desktop-tabs">
      <div @click="switchTab('overview')" :class="{ active: tab === 'overview'}" class="tab"> OVERVIEW </div>
      <div @click="switchTab('bets')" :class="{ active: tab === 'bets'}" class="tab"> BETS </div>
      <div @click="switchTab('payments')" :class="{ active: tab === 'payments'}" class="tab"> PAYMENTS </div>
    </div>
    <div class="right-btn-container">
      <div class="buttons">
        <button class="btn-red">
          Exclude from Bonuses
        </button>
        <button class="btn-normal" @click="showModal('bonus')">
          <img src="/images/svg/plus-24.svg" alt="plus">
          Add Bonus
        </button>
      </div>
    </div>
    <div v-if="player != null" class="player-stats-container player-stats-container-large">
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Total Wager</p>
            <h3>£{{addCommas(player.totalWager)}}</h3>
          </div>
          <img src="/images/svg/TotalWager.svg" alt="TW">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>GGR</p>
            <h3 style="color: #82e14f">£{{addCommas(player.totalGGR)}}</h3>
          </div>
          <img src="/images/svg/ggr.svg" alt="ggr">
        </div>
      </div>
    </div>
    <div v-if="player != null" class="player-stats-container">
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Deposit Amount</p>
            <h3>£{{addCommas(player.totalDeposited)}}</h3>
          </div>
          <img src="/images/svg/DepositAmount.svg" alt="DA">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Last Deposit</p>
            <h3>£{{addCommas(player.lastDepositAmount)}}</h3>
          </div>
          <img src="/images/svg/LastDeposit.svg" alt="LD">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Deposit Count</p>
            <h3>{{player.depositCount}}</h3>
          </div>
          <img src="/images/svg/DepositCount.svg" alt="DC">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Bonuses</p>
            <h3 style="color: #ff3e1d">£{{addCommas(player.totalBonusAmount)}}</h3>
          </div>
          <img src="/images/svg/Bonuses.svg" alt="Bo">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Signup Date</p>
            <h4>{{player.signupDate.split('T')[0]}}</h4>
            <span>{{player.signupDate.split('T')[1].split('.')[0]}}</span>
          </div>
          <img src="/images/svg/SignupDate.svg" alt="SD">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Last Bet</p>
            <h4 style="color: #82e14f">£{{addCommas(player.lastBetAmount)}}</h4>
            <span>{{player.lastBetDate.split('.')[0].replace('T', ' ')}}</span>
          </div>
          <img src="/images/svg/LastBet.svg" alt="LB">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Total Bets</p>
            <h3>{{player.totalBets}}</h3>
          </div>
          <img src="/images/svg/TotalBets.svg" alt="TB">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div style=" display: flex; flex-direction: column; justify-content: space-between; " >
            <p>Signup Code</p>
            <h4>{{player.signupPromoCode}}</h4>
          </div>
          <img src="/images/svg/SignupCode.svg" alt="SC">
        </div>
      </div>
    </div>
  
    <teleport to="body">
      <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
        <div v-if="(modalType === 'bonus')" @click="closeModal" class="cross-button-banner-modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" > <path d="M19.3332 2.54699L17.4532 0.666992L9.99984 8.12033L2.5465 0.666992L0.666504 2.54699L8.11984 10.0003L0.666504 17.4537L2.5465 19.3337L9.99984 11.8803L17.4532 19.3337L19.3332 17.4537L11.8798 10.0003L19.3332 2.54699Z" fill="white" /> </svg>
        </div>
        <div v-if="modalType === 'bonus'" class="detail-modal">
          <div class="modal-banner">
            <h1>Add Bonus</h1>
          </div>
          <div class="player-modal">
            <form @submit.prevent="submitBonus">
              <div class="bonus-form">
                <div class="form-group">
                  <div>
                    <label for="currency">CURRENCY</label>
                    <SelectDropdown :dataList="optionsList" @selected="handleSelected" :customStyle="dropdownStyle" position="absolute" name="currency" />
                  </div>
                  <div>
                    <label for="expiers">EXPIRES (IN DAYS)</label>
                    <input v-model="expireInDays" type="text" placeholder="0"  @input="handleInput('expireInDays', $event)">
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
                    <input v-model="numberOfSpins" type="text" placeholder="5"  @input="handleInput('numberOfSpins', $event)">
                  </div>
                  <div>
                    <label for="freespins">VALUE OF FREE SPIN</label>
                    <input v-model="freeSpins" type="text" placeholder="10" @input="handleInput('freeSpins', $event)">
                  </div>
                </div>
              </div>
              <div class="right-btn-container">
                <button type="submit" class="btn-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </teleport>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import SelectDropdown from "@/components/SelectDropdown.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/api";
import { addCommas } from "../../utils";

const route = useRoute();
const tab = ref("overview");
const playerId = route.params.id;
const player = ref(null);
const modalType = ref(null);
const isModalVisible = ref(false);
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

const showModal = (type) => {
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  await getPlayer();
});

const getPlayer = async () => {
  const response = await api.players.getPlayer(playerId);
  player.value = response.data;
};

const switchTab = (type) => {
  tab.value = type;
};

const handleSelected = (options) => {
  const {option, name} = options 
  selectedOption.value[name] = option;
};

const submitBonus = () => {
  console.log({
    expire: expireInDays.value,
    searchGame: searchGame.value,
    NumberOfSpins: numberOfSpins.value,
    freeSpins: freeSpins.value,
    currency: selectedOption.value.currency
  })
}

const handleInput = (fieldName, event) => {
    eval(`${fieldName}.value = event.target.value.replace(/\\D/, '');`);
}

    
</script>

