<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>Welcome Offers</h1>
        </div>
        <div class="right-btn-container">
            <button class="btn-lg">
                <img src="/images/svg/plus-24.svg" alt="plus">
                Create Welcome Offer</button>
        </div>
        <div class="edit-role-card">
            <div class="card-header">
                <h3>Active Offers</h3>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="w-20"><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>Start <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>End <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>Promo Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="index in 2" :key="index">
                            <td>Splash10{{ index }}</td>
                            <td>26/01/2024</td>
                            <td>01/01/2024</td>
                            <td>Splash10{{ index }}</td>
                            <td><router-link :to="{ name: 'welcome-offer-detail', params: { code: 'Splash10'+index }}">View</router-link></td>
                            <td><a>Edit</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="edit-role-card">
            <div class="card-header">
                <h3>Past Offers</h3>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="w-20"><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>Start <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>End <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-20"><span>Promo Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="1 === 2" v-for="index in 6" :key="index">
                            <td>Name</td>
                            <td>Start</td>
                            <td>End</td>
                            <td>Code</td>
                            <td><a>View</a></td>
                            <td><a>Edit</a></td>
                        </tr>
                        <tr v-else><td colspan="6" style="text-align: center;">No records found.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import {SortingIcon} from '@/utils';
</script>

<style scoped>
.w-20 {
    width: 20%;
}
</style>