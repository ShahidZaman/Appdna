import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import Login from "@/views/Login.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Security from "@/views/Security.vue";
import Sessions from "@/views/Sessions.vue";
import Account from "@/views/Account.vue";
import Users from "@/views/Admin/Users/Users.vue";
import Roles from "@/views/Admin/Roles/Roles.vue";
import EditRole from "@/views/Admin/Roles/EditRole.vue";
import Brands from "@/views/Brands/Brands.vue";
import EditBrand from "@/views/Brands/EditBrand.vue";
import Dashboard from "@/views/Dashboard.vue";
import Games from "@/views/Admin/Games/AllGames.vue";
import GamesLists from "@/views/Admin/Games/ListGames.vue";
import CreateGameList from "@/views/Admin/Games/CreateGamesList.vue";
import EditGamesList from "@/views/Admin/Games/EditGamesList.vue";
import Players from "@/views/Players/AllPlayers.vue";
import PlayerDetails from "@/views/Players/PlayerDetails.vue";
import WelcomeOffers from "@/views/BonusManagement/WelcomeOffers.vue";
import WelcomeOfferDetail from "@/views/BonusManagement/WelcomeOfferDetail.vue"
import CreditFromCSV from "@/views/BonusManagement/CreditFromCSV.vue";
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/security",
      name: "security",
      component: Security,
      meta: { requiresAuth: true }
    },
    {
      path: "/sessions",
      name: "sessions",
      component: Sessions,
      meta: { requiresAuth: true }
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: "/roles",
      name: "roles",
      component: Roles,
      meta: { requiresAuth: true }
    },
    {
      path: "/roles/:id",
      name: "edit-role",
      component: EditRole,
      meta: { requiresAuth: true }
    },
    {
      path: "/brands",
      name: "brands",
      component: Brands,
      meta: { requiresAuth: true }
    },
    {
      path: "/brands/:id",
      name: "edit-brand",
      component: EditBrand,
      meta: { requiresAuth: true }
    },
    {
      path: "/games",
      name: "games",
      component: Games,
      meta: { requiresAuth: true }
    },
    {
      path: "/games/games-lists",
      name: "games-lists",
      component: GamesLists,
      meta: { requiresAuth: true }
    },
    {
      path: "/games/create-game-list",
      name: "create-game-list",
      component: CreateGameList,
      meta: { requiresAuth: true }
    },
    {
      path: "/games/edit-game-list/:id",
      name: "edit-game-list",
      component: EditGamesList,
      meta: { requiresAuth: true }
    },
    {
      path: "/players",
      name: "players",
      component: Players,
      meta: { requiresAuth: true }
    },
    {
      path: "/players/:id",
      name: "player-details",
      component: PlayerDetails,
      meta: { requiresAuth: true }
    },
    {
      path: "/welcome-offers",
      name: "welcome-offers",
      component: WelcomeOffers,
      meta: { requiresAuth: true }
    },
    {
      path: "/welcome-offers/detail/:code",
      name: "welcome-offer-detail",
      component: WelcomeOfferDetail,
      meta: { requiresAuth: true }
    },
    
    {
      path: "/credit-from-csv",
      name: "credit-from-csv",
      component: CreditFromCSV,
      meta: { requiresAuth: true }
    },
    { 
      path: '/:catchAll(.*)', 
      name: "not-found",
      component: NotFound 
    }
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    if (authStore.loggedIn) {
      next();
    } else {
      await authStore.loginFromStorage();
      if(authStore.loggedIn) {
      next();
      }
      else {
        next('/login');
      }
    }
  } else if ((to.name === 'login' || to.name === 'forgot-password' || to.name === 'reset-password') && authStore.loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
