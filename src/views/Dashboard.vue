<template>
    <div>
        <div class="dashboard-banner">
            <img v-if="authStore.tenantName && authStore.tenantIcon" :src="authStore.tenantUrl" alt=""  />
            <div v-if="authStore.tenantName && !authStore.tenantIcon" :style="[{color: getDefaultLogoColor('color')}, {backgroundColor: getDefaultLogoColor('background')}]" class="defaultBrandIcon">{{ authStore.tenantName[0] }}</div>
            <img v-if="!authStore.tenantName && !authStore.tenantIcon" src="/images/master_dashboard.png" alt=""  style="width: 79.876px; height: 80px;"/>
            <h1>{{authStore.tenantName || "Master"}} Dashboard</h1>
        </div>
        <div class="dashboard-stats-container">
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Players</p>
                        <h3 style="color: #696CFF">{{addCommas(86)}}</h3>
                    </div>
                    <img src="/images/svg/Players.svg" alt="Pl">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Deposit Count</p>
                        <h3>{{addCommas(5476)}}</h3>
                    </div>
                    <img src="/images/svg/DepositCount.svg" alt="DC">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Total Deposited</p>
                        <h3>£{{addCommas(87395.65)}}</h3>
                    </div>
                    <img src="/images/svg/DepositAmount.svg" alt="DA">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Wager</p>
                        <h3>£{{addCommas(659.43)}}</h3>
                    </div>
                    <img src="/images/svg/TotalWager.svg" alt="TW">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Bonus Count</p>
                        <h3>{{addCommas(876)}}</h3>
                    </div>
                    <img src="/images/svg/TotalBets.svg" alt="TB">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Total Bonuses</p>
                        <h3>£{{addCommas(3)}}</h3>
                    </div>
                    <img src="/images/svg/Bonuses.svg" alt="Bo">
                </div>
            </div>
            
        </div>
        <div  v-if="!authStore.tenantName && !authStore.tenantIcon" class="card" >
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th><span>Brands <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Players <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Deposits <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Bets <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Bonuses <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Total Deposited <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Wager <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(brand, index) in authStore.allTenants" :key="index">
                            <td>
                                <div class="brand-name-container">
                                    <div :style="[{ color: brand.defaultLogo.color }, { background: brand.defaultLogo.background }]" class="brand-name-logo">
                                        {{ capitalizeFirstLetter(brand.name[0]) }}
                                    </div>
                                    <a  @click.prevent="setTenant(brand.key, brand.name, brand.iconUrl)" href="#">{{ brand.name }}</a>
                                </div>
                            </td>
                            <td>23</td>
                            <td>786</td>
                            <td>93823</td>
                            <td>3</td>
                            <td>£{{ addCommas(58395.90) }}</td>
                            <td>£{{ addCommas(194865) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { addCommas, capitalizeFirstLetter } from '@/utils';
import router from "@/router/index";
import {SortingIcon} from '@/utils';

const authStore = useAuthStore();

const getDefaultLogoColor = (name) => {
    return authStore.allTenants.find(item => item.name.toLocaleLowerCase() === authStore.tenantName.toLocaleLowerCase())?.defaultLogo[name]
}

async function setTenant(tenantId, name, icon) {
  authStore.setTenant(tenantId, name, icon);
  router.push("/");
}
</script>
