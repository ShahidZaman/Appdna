<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>{{ offerCode }}</h1>
        </div>
        <div class="breadcrumbs">
            <router-link to="/welcome-offers">Welcome Offers</router-link>
            <span>
                <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">{{ offerCode }}</span>
        </div>
        <div class="dashboard-stats-container">
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Deposits</p>
                        <h3>£{{ addCommas(87395.65) }}</h3>
                    </div>
                    <img src="/images/svg/DepositAmount.svg" alt="DA">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Wager</p>
                        <h3>£{{ addCommas(659.43) }}</h3>
                    </div>
                    <img src="/images/svg/TotalWager.svg" alt="TW">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Total Bonus Credited</p>
                        <h3 style="color: #FF3E1D;">£{{ addCommas(3) }}</h3>
                    </div>
                    <img src="/images/svg/Bonuses.svg" alt="Bo">
                </div>
            </div>

        </div>
        <div class="card">
            <div class="offer-detail-container">
                <div class="offer-detail-card">
                    <h3>Details</h3>
                    <div class="offer-detail">
                        <p>Start Date: <span>26/01/2024</span></p>
                        <p>End Date: <span>26/01/2024</span></p>
                        <p>Max Win for Canpaign: <span>0</span></p>
                        <p>Currency: <span>GDP</span></p>
                    </div>
                </div>
                <div class="offer-detail-card">
                    <h3>Conditions</h3>
                    <div class="offer-detail">
                        <p>Min. Deposit: <span>24</span></p>
                        <p>Signup Bonus Code: <span>Splash100</span></p>
                        <p>Wager Required: <span>25</span></p>
                        <p>Period (days): <span>1</span></p>
                    </div>
                </div>
                <div class="offer-detail-card">
                    <h3>Free Spins</h3>
                    <div class="offer-detail">
                        <p>Number of Spins: <span>100</span></p>
                        <p>Spin Value: <span>0.10</span></p>
                        <p>Game: <span>Big Bass Splash</span></p>
                        <p>Expires (Days): <span>7</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-role-card">
            <div class="card-header">
                <h3>Player Bonuses</h3>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th><span>Date <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Player <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Currency <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Number of spins <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Spin value <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="1 === 1" v-for="index in 6" :key="index">
                            <td>02/02/2024</td>
                            <td><a href="#">487539</a></td>
                            <td>GBP</td>
                            <td>100</td>
                            <td>0.10</td>
                        </tr>
                        <tr v-else>
                            <td colspan="5" style="text-align: center;">No records found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <div class="pagination-text">Showing 1 to 20 of 2100 entries</div>
                <div class="pagination-btns">
                    <button class="previous disabled">Previous</button>
                    <button class="num-btn active">1</button>
                    <button class="num-btn">2</button>
                    <button class="num-btn">3</button>
                    <button class="num-btn">4</button>
                    <button class="next">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { addCommas } from '@/utils';
import {SortingIcon} from '@/utils';

const route = useRoute();
const offerCode = ref(null);

onMounted(() => {
    offerCode.value = route.params.code
})
</script>