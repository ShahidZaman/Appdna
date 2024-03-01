<template>
  <div>
    <div @click="toggleSidebar" :class="{ active: showSidebar }" class="overlay"></div>
    <div style="display: flex">
      <div v-if="authStore.loggedIn" id="workspace-menu" :class="{ active: showSidebar }">
        <div @click="setTenant('', '', '')" class="workspace-logo master-logo">
          <img src="/images/app_logo_lg.png" alt="workspace-logo"/>
        </div>

        <div class="logo-wrapper">
          <div  v-for="brand in brands" :key="brand.id" class="workspace-logo">
            <img v-if="brand.iconUrl" :src="brand.iconUrl" alt="workspace-logo"/>
            <div v-else :style="[{backgroundColor: brand.defaultLogo.background, color: brand.defaultLogo.color}]" @click="setTenant(brand.key, brand.name, brand.iconUrl)" class="name-logo"> {{ capitalizeFirstLetter(brand.name[0]) }}</div>
          </div>
        </div>
        
      </div>
      <div v-if="authStore.loggedIn"  :class="{ active: showSidebar }" id="sidebar">
        <a href="/" class="logo">
          <img v-if="authStore.tenantName && authStore.tenantIcon" :src="authStore.tenantUrl" alt=""  />
          <div v-if="authStore.tenantName && !authStore.tenantIcon" class="default-logo" :style="[{color: getDefaultLogoColor('color')}, {backgroundColor: getDefaultLogoColor('background')}]">{{ capitalizeFirstLetter(authStore.tenantName[0]) }}</div> 
          <img v-else src="/images/app_logo_lg.png" style="width: 40px" alt="app logo" />
          {{ authStore.tenantName || 'Backoffice' }}
        </a>
  
        <span class="mobile-view">
          <span @click="toggleSidebar" class="sidebar-close-icon-container ">
            <span class="sidebar-close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"> <path d="M10.4542 3.7041L5.15918 8.99985L10.4542 14.2956L12.0457 12.7041L8.34068 8.99985L12.0457 5.2956L10.4542 3.7041Z" fill="white" /> </svg>
            </span>
          </span>
        </span>
        
        <nav>
            <ul>
              <li>
                <router-link :class="{'exact-active': checkRoute({path: route.path, to: '/'})}" to="/">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: ; msfilter: "><path d="M3.00003 13.0002H4.00003V20.0002C4.00003 21.1032 4.89703 22.0002 6.00003 22.0002H18C19.103 22.0002 20 21.1032 20 20.0002V13.0002H21C21.1978 13.0002 21.3911 12.9415 21.5555 12.8316C21.7199 12.7217 21.848 12.5656 21.9237 12.3829C21.9994 12.2002 22.0192 11.9991 21.9806 11.8052C21.942 11.6112 21.8468 11.4331 21.707 11.2932L12.707 2.2932C12.6142 2.20026 12.504 2.12652 12.3827 2.07621C12.2614 2.0259 12.1314 2 12 2C11.8687 2 11.7387 2.0259 11.6173 2.07621C11.496 2.12652 11.3858 2.20026 11.293 2.2932L2.29303 11.2932C2.15322 11.4331 2.05802 11.6112 2.01945 11.8052C1.98088 11.9991 2.00068 12.2002 2.07635 12.3829C2.15202 12.5656 2.28016 12.7217 2.44457 12.8316C2.60898 12.9415 2.80228 13.0002 3.00003 13.0002ZM10 20.0002V15.0002H14V20.0002H10ZM12 4.4142L18 10.4142V15.0002L18.001 20.0002H16V15.0002C16 13.8972 15.103 13.0002 14 13.0002H10C8.89703 13.0002 8.00003 13.8972 8.00003 15.0002V20.0002H6.00003V10.4142L12 4.4142Z" /></svg>
                  Dashboard
                </router-link>
              </li>
              <li v-if="!authStore.tenantId">
                <router-link to="/users" :class="{'exact-active': route.path.includes('/users')}">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.604 11.548C17.213 10.5101 17.476 9.30528 17.355 8.10797C17.176 6.32397 16.18 4.74697 14.552 3.66797L13.447 5.33397C14.566 6.07597 15.247 7.13297 15.365 8.30797C15.4194 8.85407 15.3514 9.40543 15.1659 9.92195C14.9805 10.4385 14.6823 10.9072 14.293 11.294L13.101 12.486L14.719 12.961C18.951 14.201 19 18.457 19 18.5H21C21 16.711 20.044 13.215 16.604 11.548Z" /> <path d="M9.5 12.5C11.706 12.5 13.5 10.706 13.5 8.5C13.5 6.294 11.706 4.5 9.5 4.5C7.294 4.5 5.5 6.294 5.5 8.5C5.5 10.706 7.294 12.5 9.5 12.5ZM9.5 6.5C10.603 6.5 11.5 7.397 11.5 8.5C11.5 9.603 10.603 10.5 9.5 10.5C8.397 10.5 7.5 9.603 7.5 8.5C7.5 7.397 8.397 6.5 9.5 6.5ZM11 13.5H8C4.691 13.5 2 16.191 2 19.5V20.5H4V19.5C4 17.294 5.794 15.5 8 15.5H11C13.206 15.5 15 17.294 15 19.5V20.5H17V19.5C17 16.191 14.309 13.5 11 13.5Z" /> </svg>
                  Users
                </router-link>
              </li>
              <li v-if="!authStore.tenantId">
                <router-link to="/roles" :class="{'exact-active': route.path.includes('/roles')}">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20.895 8.053L18.895 4.053C18.8118 3.88684 18.6841 3.74711 18.526 3.64944C18.3679 3.55177 18.1858 3.50003 18 3.5H13C12.621 3.5 12.275 3.714 12.105 4.053L10.382 7.5H5.99998C5.62098 7.5 5.27498 7.714 5.10498 8.053L3.10498 12.053C3.03546 12.1919 2.99927 12.3451 2.99927 12.5005C2.99927 12.6559 3.03546 12.8091 3.10498 12.948L5.10498 16.948C5.27498 17.286 5.62098 17.5 5.99998 17.5H10.382L12.106 20.947C12.1888 21.1132 12.3163 21.2531 12.4743 21.3507C12.6322 21.4484 12.8143 21.5001 13 21.5H18C18.379 21.5 18.725 21.286 18.895 20.947L20.895 16.947C20.9645 16.8081 21.0007 16.6549 21.0007 16.4995C21.0007 16.3441 20.9645 16.1909 20.895 16.052L19.118 12.5L20.894 8.947C20.9635 8.80828 20.9998 8.65528 20.9999 8.50012C21.0001 8.34495 20.9642 8.19188 20.895 8.053ZM13.618 5.5H17.382L18.882 8.5L17.382 11.5H13.618L12.118 8.5L13.618 5.5ZM5.11798 12.5L6.61798 9.5H10.382L11.882 12.5L10.382 15.5H6.61798L5.11798 12.5ZM17.382 19.5H13.618L12.118 16.5L13.618 13.5H17.382L18.882 16.5L17.382 19.5Z" /> </svg>
                  Roles
                </router-link>
              </li>
              <li v-if="authStore.tenantId">
                <router-link :class="{'exact-active': checkRoute({path: route.path, to: '/players'})}" to="/players">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"> </path> </svg>
                  Players
                </router-link>
              </li>
              <li v-if="!authStore.tenantId">
                <router-link :class="{'exact-active': checkRoute({path: route.path, to: '/brands'})}" to="/brands">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.759999 18.2002C1.03435 18.4905 1.36909 18.7171 1.74058 18.864C2.11207 19.0109 2.51127 19.0744 2.91 19.0502C4.07912 18.989 5.22452 18.6967 6.28 18.1902C7.86179 18.899 9.61462 19.136 11.3278 18.8726C13.0411 18.6093 14.6418 17.8568 15.9377 16.7056C17.2336 15.5544 18.1694 14.0535 18.6328 12.3833C19.0963 10.713 19.0675 8.94447 18.55 7.29017C19.86 5.06017 20.3 3.03017 19.22 1.81017C18.906 1.44605 18.5076 1.16449 18.0595 0.990146C17.6115 0.815805 17.1275 0.754007 16.65 0.810165C15.7036 0.95453 14.8185 1.36756 14.1 2.00017C12.4869 1.18057 10.6642 0.866223 8.86975 1.09813C7.0753 1.33003 5.39241 2.09743 4.04067 3.30018C2.68892 4.50293 1.73108 6.0852 1.29213 7.84052C0.853181 9.59584 0.9535 11.4427 1.58 13.1402C0.519999 14.3502 -0.470001 16.8202 0.759999 18.2002ZM2.26 16.8802C2.04 16.6302 2.26 15.8102 2.63 15.1202C3.07753 15.7643 3.60508 16.349 4.2 16.8602C3.17 17.1602 2.49 17.1402 2.26 16.8802ZM16.77 11.7102C16.3161 13.5059 15.169 15.0485 13.58 16.0002C12.4963 16.6446 11.2608 16.9897 10 17.0002C9.58343 16.997 9.16816 16.9535 8.76 16.8702C10.3289 15.9081 11.8082 14.807 13.18 13.5802C14.5612 12.3605 15.8328 11.0221 16.98 9.58016C17.0215 10.2968 16.9507 11.0155 16.77 11.7102ZM16.86 2.82017C17.0203 2.79377 17.1847 2.80938 17.3372 2.86546C17.4897 2.92155 17.625 3.01619 17.73 3.14017C17.96 3.40017 17.89 4.08017 17.47 5.07017C17.019 4.38089 16.4775 3.7553 15.86 3.21017C16.1609 3.00872 16.5022 2.87561 16.86 2.82017ZM3.22 8.31017C3.43929 7.41609 3.83427 6.57458 4.38193 5.83463C4.92959 5.09469 5.619 4.47109 6.41 4.00017C7.49432 3.34856 8.73496 3.00298 10 3.00017C11.2114 2.99181 12.4037 3.30255 13.457 3.90114C14.5102 4.49973 15.3873 5.36508 16 6.41017C16.1324 6.62147 16.2493 6.84204 16.35 7.07017C15.0639 8.91456 13.5559 10.5938 11.86 12.0702C10.1931 13.6032 8.34229 14.9233 6.35 16.0002C5.08384 15.2223 4.09806 14.0618 3.53534 12.6865C2.97263 11.3111 2.86219 9.79243 3.22 8.35017V8.31017Z" /> </svg>
                  Brands
                </router-link>
              </li>
              <li v-if="authStore.tenantId">
                <div class="dropdown-btn" :style="checkActive('bonus', true)" @click="toggleOpen('bonus')">
                  <div style="display: flex; align-items: center; gap: 10px">
                    <svg :style="checkActive('bonus')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2H7C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V8C2 12.31 3.799 14.91 6.819 15.012C7.26111 15.7718 7.86475 16.4252 8.58722 16.926C9.3097 17.4267 10.1334 17.7627 11 17.91V20H9V22H15V20H13V17.91C13.8664 17.7621 14.6899 17.4259 15.4122 16.9252C16.1346 16.4245 16.7384 15.7714 17.181 15.012C20.201 14.91 22 12.31 22 8V5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM4 8V6H6V12.83C4.216 12.078 4 9.299 4 8ZM12 16C9.794 16 8 14.206 8 12V4H16V12C16 14.206 14.206 16 12 16ZM18 12.83V6H20V8C20 9.299 19.784 12.078 18 12.83Z" /></svg>
                    <span>Bonus Management</span>
                  </div>
                  <svg :style="checkActive('bonus')" :class="{'open': dropdownBonus}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-right"> <path d="M5 14.6328L6.73436 16.3672L12 11.1015L17.2656 16.3672L19 14.6328L12 7.63281L5 14.6328Z" /> </svg>
                </div>
                <ul class="collapsable-dropdown" :class="{'open': dropdownBonus}">
                  <li>
                    <router-link to="/welcome-offers" :class="{'exact-active': route.path.includes('/welcome-offers')}">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 7H18.791C18.9377 6.51378 19.0082 6.00779 19 5.5C19 3.57 17.43 2 15.5 2C13.878 2 12.795 3.482 12.096 5.085C11.407 3.57 10.269 2 8.5 2C6.57 2 5 3.57 5 5.5C5 6.096 5.079 6.589 5.209 7H4C2.897 7 2 7.897 2 9V11C2 12.103 2.897 13 4 13V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V13C21.103 13 22 12.103 22 11V9C22 7.897 21.103 7 20 7ZM15.5 4C16.327 4 17 4.673 17 5.5C17 7 16.374 7 16 7H13.522C14.033 5.424 14.775 4 15.5 4ZM7 5.5C7 4.673 7.673 4 8.5 4C9.388 4 10.214 5.525 10.698 7H8C7.626 7 7 7 7 5.5ZM4 9H11V11H4V9ZM6 20V13H11V20H6ZM18 20H13V13H18V20ZM13 11V9.085L13.017 9H20L20.001 11H13Z" /></svg>
                      Welcome Offers
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/credit-from-csv" :class="{'exact-active': route.path.includes('/credit-from-csv')}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.67 10.7385C17.4591 10.5278 17.1731 10.4095 16.875 10.4095C16.5769 10.4095 16.2909 10.5278 16.08 10.7385L13.125 13.6935V2.625C13.125 2.32663 13.0065 2.04048 12.7955 1.8295C12.5845 1.61853 12.2984 1.5 12 1.5C11.7016 1.5 11.4155 1.61853 11.2045 1.8295C10.9935 2.04048 10.875 2.32663 10.875 2.625V13.6935L7.92 10.7385C7.70674 10.5398 7.42467 10.4316 7.13322 10.4367C6.84176 10.4419 6.56369 10.5599 6.35757 10.7661C6.15145 10.9722 6.03338 11.2503 6.02824 11.5417C6.0231 11.8332 6.13128 12.1152 6.33 12.3285L11.205 17.2035L12 18L12.795 17.205L17.67 12.33C17.7745 12.2255 17.8575 12.1015 17.9141 11.9649C17.9706 11.8284 17.9998 11.682 17.9998 11.5343C17.9998 11.3865 17.9706 11.2401 17.9141 11.1036C17.8575 10.967 17.7745 10.843 17.67 10.7385ZM3.75 14.625C3.75 14.4773 3.7209 14.331 3.66436 14.1945C3.60783 14.058 3.52496 13.934 3.4205 13.8295C3.31603 13.725 3.19201 13.6422 3.05552 13.5856C2.91903 13.5291 2.77274 13.5 2.625 13.5C2.47726 13.5 2.33097 13.5291 2.19448 13.5856C2.05799 13.6422 1.93397 13.725 1.8295 13.8295C1.72504 13.934 1.64217 14.058 1.58564 14.1945C1.5291 14.331 1.5 14.4773 1.5 14.625V19.5C1.5 20.2956 1.81607 21.0587 2.37868 21.6213C2.94129 22.1839 3.70435 22.5 4.5 22.5H19.5C20.2956 22.5 21.0587 22.1839 21.6213 21.6213C22.1839 21.0587 22.5 20.2956 22.5 19.5V14.625C22.5 14.3266 22.3815 14.0405 22.1705 13.8295C21.9595 13.6185 21.6734 13.5 21.375 13.5C21.0766 13.5 20.7905 13.6185 20.5795 13.8295C20.3685 14.0405 20.25 14.3266 20.25 14.625V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.625Z" /></svg>
                      Credit from CSV
                    </router-link>
                  </li>
                </ul>
              </li>
              <li v-if="authStore.tenantId">
                <div class="dropdown-btn" :style="checkActive('admin', true)" @click="toggleOpen('admin')">
                  <div style="display: flex; align-items: center; gap: 10px">
                    <svg  :style="checkActive('admin')" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_2238_1701)"> <path d="M12 2C11.0111 2 10.0444 2.29324 9.22215 2.84265C8.3999 3.39206 7.75904 4.17295 7.3806 5.08658C7.00216 6.00021 6.90315 7.00555 7.09607 7.97545C7.289 8.94536 7.7652 9.83627 8.46447 10.5355C9.16373 11.2348 10.0546 11.711 11.0245 11.9039C11.9945 12.0969 12.9998 11.9978 13.9134 11.6194C14.827 11.241 15.6079 10.6001 16.1573 9.77785C16.7068 8.95561 17 7.98891 17 7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2ZM12 10C11.4067 10 10.8266 9.82405 10.3333 9.49441C9.83994 9.16476 9.45542 8.69623 9.22836 8.14805C9.0013 7.59987 8.94189 6.99667 9.05764 6.41473C9.1734 5.83279 9.45912 5.29824 9.87868 4.87868C10.2982 4.45912 10.8328 4.1734 11.4147 4.05764C11.9967 3.94189 12.5999 4.0013 13.1481 4.22836C13.6962 4.45542 14.1648 4.83994 14.4944 5.33329C14.8241 5.82664 15 6.40666 15 7C15 7.79565 14.6839 8.55871 14.1213 9.12132C13.5587 9.68393 12.7956 10 12 10ZM21 21V20C21 18.1435 20.2625 16.363 18.9497 15.0503C17.637 13.7375 15.8565 13 14 13H10C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20V21H5V20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15H14C15.3261 15 16.5979 15.5268 17.5355 16.4645C18.4732 17.4021 19 18.6739 19 20V21H21Z" /> <rect x="13" y="13" width="10.6376" height="11.1667" rx="5.3188" fill="white" /> <path d="M14.1228 20.479L14.5811 21.2719C14.8245 21.6922 15.4102 21.8499 15.8323 21.6065L16.0748 21.4662C16.34 21.6748 16.6323 21.8463 16.9438 21.9759V22.25C16.9438 22.7555 17.3549 23.1667 17.8605 23.1667H18.7771C19.2827 23.1667 19.6938 22.7555 19.6938 22.25V21.9759C20.0052 21.8463 20.2975 21.675 20.5628 21.4667L20.8053 21.607C21.2283 21.8499 21.8127 21.6931 22.057 21.2719L22.5148 20.4795C22.6363 20.2689 22.6692 20.0188 22.6064 19.784C22.5436 19.5493 22.3902 19.349 22.1798 19.2273L21.9483 19.0935C21.9976 18.7555 21.9976 18.4121 21.9483 18.0741L22.1798 17.9403C22.3901 17.8185 22.5434 17.6182 22.6062 17.3835C22.6691 17.1487 22.6362 16.8987 22.5148 16.6881L22.057 15.8957C21.8136 15.474 21.2283 15.3159 20.8053 15.5602L20.5628 15.7004C20.2976 15.4918 20.0053 15.3204 19.6938 15.1908V14.9167C19.6938 14.4111 19.2827 14 18.7771 14H17.8605C17.3549 14 16.9438 14.4111 16.9438 14.9167V15.1908C16.6324 15.3204 16.3401 15.4917 16.0748 15.7L15.8323 15.5597C15.4088 15.3163 14.824 15.474 14.5806 15.8952L14.1228 16.6877C14.0013 16.8982 13.9683 17.1483 14.0312 17.3831C14.094 17.6179 14.2474 17.8181 14.4578 17.9398L14.6893 18.0737C14.6399 18.4115 14.6399 18.7547 14.6893 19.0925L14.4578 19.2264C14.2475 19.3483 14.0941 19.5486 14.0313 19.7834C13.9685 20.0182 14.0014 20.2684 14.1228 20.479ZM15.6472 19.2149C15.5954 19.0084 15.5691 18.7963 15.5688 18.5833C15.5688 18.3716 15.5954 18.1589 15.6467 17.9517C15.6709 17.8552 15.6629 17.7534 15.6241 17.6618C15.5852 17.5701 15.5175 17.4936 15.4313 17.4439L14.9166 17.146L15.374 16.3535L15.8988 16.657C15.9844 16.7065 16.0837 16.7269 16.1819 16.7152C16.2801 16.7034 16.3718 16.6602 16.4433 16.5919C16.7534 16.297 17.1273 16.0775 17.536 15.9507C17.6298 15.922 17.712 15.864 17.7705 15.7851C17.8289 15.7062 17.8604 15.6107 17.8605 15.5125V14.9167H18.7771V15.5125C18.7772 15.6107 18.8087 15.7062 18.8671 15.7851C18.9256 15.864 19.0078 15.922 19.1016 15.9507C19.5102 16.0777 19.8841 16.2971 20.1943 16.5919C20.2659 16.66 20.3576 16.7032 20.4557 16.7149C20.5539 16.7267 20.6532 16.7063 20.7388 16.657L21.2631 16.354L21.7215 17.1465L21.2063 17.4439C21.1201 17.4937 21.0525 17.5702 21.0136 17.6618C20.9748 17.7534 20.9668 17.8552 20.9909 17.9517C21.0422 18.1589 21.0688 18.3716 21.0688 18.5833C21.0688 18.7946 21.0422 19.0073 20.9904 19.2149C20.9664 19.3115 20.9744 19.4133 21.0134 19.505C21.0523 19.5966 21.12 19.673 21.2063 19.7227L21.721 20.0202L21.2636 20.8127L20.7388 20.5097C20.6532 20.4601 20.5539 20.4396 20.4557 20.4514C20.3575 20.4631 20.2658 20.5064 20.1943 20.5748C19.8842 20.8697 19.5103 21.0891 19.1016 21.216C19.0078 21.2447 18.9256 21.3027 18.8671 21.3816C18.8087 21.4605 18.7772 21.556 18.7771 21.6542L18.778 22.25H17.8605V21.6542C17.8604 21.556 17.8289 21.4605 17.7705 21.3816C17.712 21.3027 17.6298 21.2447 17.536 21.216C17.1274 21.0889 16.7535 20.8695 16.4433 20.5748C16.3719 20.5062 16.2802 20.4628 16.1819 20.4512C16.0836 20.4395 15.9842 20.4602 15.8988 20.5102L15.3745 20.8136L14.9161 20.0211L15.4313 19.7227C15.5176 19.673 15.5853 19.5966 15.6242 19.505C15.6632 19.4133 15.6712 19.3115 15.6472 19.2149Z" /> <path d="M18.3188 20.4167C19.3299 20.4167 20.1521 19.5944 20.1521 18.5833C20.1521 17.5722 19.3299 16.75 18.3188 16.75C17.3077 16.75 16.4855 17.5722 16.4855 18.5833C16.4855 19.5944 17.3077 20.4167 18.3188 20.4167ZM18.3188 17.6667C18.8156 17.6667 19.2355 18.0865 19.2355 18.5833C19.2355 19.0802 18.8156 19.5 18.3188 19.5C17.822 19.5 17.4021 19.0802 17.4021 18.5833C17.4021 18.0865 17.822 17.6667 18.3188 17.6667Z" /> </g> <defs> <clipPath id="clip0_2238_1701"> <rect width="24" height="24" fill="white" /> </clipPath> </defs> </svg>
                    <span>Admin</span>
                  </div>
                  <svg :style="checkActive('admin')" :class="{'open': dropdownAdmin}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-right"> <path d="M5 14.6328L6.73436 16.3672L12 11.1015L17.2656 16.3672L19 14.6328L12 7.63281L5 14.6328Z" /> </svg>
                </div>
                <ul :class="{'open': dropdownAdmin}" class="collapsable-dropdown">
                  <li>
                    <router-link to="/games" :class="{'exact-active': route.path.includes('/games')}">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 9.15001C21.9112 7.88551 21.3455 6.7019 20.4173 5.83864C19.489 4.97538 18.2676 4.49691 17 4.50002H6.99996C5.71772 4.49828 4.48382 4.98923 3.55326 5.87139C2.62271 6.75356 2.06663 7.95951 1.99996 9.24002C1.99432 9.32659 1.99432 9.41344 1.99996 9.50002V17C1.9973 17.4604 2.08602 17.9167 2.26097 18.3425C2.43593 18.7684 2.69363 19.1553 3.01917 19.4808C3.3447 19.8063 3.73159 20.064 4.15743 20.239C4.58327 20.4139 5.03959 20.5027 5.49996 20.5C6.92996 20.5 7.81996 19.44 8.68996 18.41C9.00996 18.04 9.33996 17.65 9.68996 17.31C10.1543 16.9699 10.6759 16.7159 11.23 16.56C11.7415 16.5 12.2584 16.5 12.77 16.56C13.324 16.7159 13.8456 16.9699 14.31 17.31C14.66 17.65 14.99 18.04 15.31 18.41C16.18 19.41 17.07 20.5 18.5 20.5C18.9603 20.5027 19.4166 20.4139 19.8425 20.239C20.2683 20.064 20.6552 19.8063 20.9807 19.4808C21.3063 19.1553 21.564 18.7684 21.7389 18.3425C21.9139 17.9167 22.0026 17.4604 22 17V9.50002C22.0054 9.41343 22.0054 9.3266 22 9.24002V9.15001ZM20 17C20 17.3978 19.8419 17.7794 19.5606 18.0607C19.2793 18.342 18.8978 18.5 18.5 18.5C18 18.5 17.5 17.86 16.84 17.12C16.5 16.73 16.12 16.27 15.69 15.86C14.9659 15.2767 14.128 14.8509 13.23 14.61C12.4165 14.4633 11.5834 14.4633 10.77 14.61C9.8719 14.8509 9.03402 15.2767 8.30996 15.86C7.87996 16.27 7.49996 16.73 7.15996 17.12C6.53996 17.86 5.99996 18.5 5.49996 18.5C5.10213 18.5 4.7206 18.342 4.4393 18.0607C4.15799 17.7794 3.99996 17.3978 3.99996 17V9.50002C4.00484 9.45013 4.00484 9.3999 3.99996 9.35002C4.03847 8.58065 4.37147 7.85558 4.92996 7.32501C5.48845 6.79445 6.22963 6.49905 6.99996 6.50002H17C17.7494 6.49674 18.4729 6.7741 19.0281 7.27749C19.5833 7.78088 19.93 8.47385 20 9.22002V9.34002C19.995 9.39323 19.995 9.4468 20 9.50002V17Z" /> <path d="M16 13.5C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5C15.4477 11.5 15 11.9477 15 12.5C15 13.0523 15.4477 13.5 16 13.5Z" /> <path d="M18 11.5C18.5523 11.5 19 11.0523 19 10.5C19 9.94772 18.5523 9.5 18 9.5C17.4477 9.5 17 9.94772 17 10.5C17 11.0523 17.4477 11.5 18 11.5Z" /> <path d="M16 9.5C16.5523 9.5 17 9.05228 17 8.5C17 7.94772 16.5523 7.5 16 7.5C15.4477 7.5 15 7.94772 15 8.5C15 9.05228 15.4477 9.5 16 9.5Z" /> <path d="M14 11.5C14.5523 11.5 15 11.0523 15 10.5C15 9.94772 14.5523 9.5 14 9.5C13.4477 9.5 13 9.94772 13 10.5C13 11.0523 13.4477 11.5 14 11.5Z" /> <path d="M8 12.5C9.10457 12.5 10 11.6046 10 10.5C10 9.39543 9.10457 8.5 8 8.5C6.89543 8.5 6 9.39543 6 10.5C6 11.6046 6.89543 12.5 8 12.5Z" /> </svg>
                      Games
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/users" :class="{'exact-active': route.path.includes('/users')}">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.604 11.548C17.213 10.5101 17.476 9.30528 17.355 8.10797C17.176 6.32397 16.18 4.74697 14.552 3.66797L13.447 5.33397C14.566 6.07597 15.247 7.13297 15.365 8.30797C15.4194 8.85407 15.3514 9.40543 15.1659 9.92195C14.9805 10.4385 14.6823 10.9072 14.293 11.294L13.101 12.486L14.719 12.961C18.951 14.201 19 18.457 19 18.5H21C21 16.711 20.044 13.215 16.604 11.548Z" /> <path d="M9.5 12.5C11.706 12.5 13.5 10.706 13.5 8.5C13.5 6.294 11.706 4.5 9.5 4.5C7.294 4.5 5.5 6.294 5.5 8.5C5.5 10.706 7.294 12.5 9.5 12.5ZM9.5 6.5C10.603 6.5 11.5 7.397 11.5 8.5C11.5 9.603 10.603 10.5 9.5 10.5C8.397 10.5 7.5 9.603 7.5 8.5C7.5 7.397 8.397 6.5 9.5 6.5ZM11 13.5H8C4.691 13.5 2 16.191 2 19.5V20.5H4V19.5C4 17.294 5.794 15.5 8 15.5H11C13.206 15.5 15 17.294 15 19.5V20.5H17V19.5C17 16.191 14.309 13.5 11 13.5Z" /> </svg>
                      Users
                    </router-link>
                  </li>
                  <li v-if="!authStore.tenantId">
                    <router-link to="/roles" :class="{'exact-active': route.path.includes('/roles')}">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20.895 8.053L18.895 4.053C18.8118 3.88684 18.6841 3.74711 18.526 3.64944C18.3679 3.55177 18.1858 3.50003 18 3.5H13C12.621 3.5 12.275 3.714 12.105 4.053L10.382 7.5H5.99998C5.62098 7.5 5.27498 7.714 5.10498 8.053L3.10498 12.053C3.03546 12.1919 2.99927 12.3451 2.99927 12.5005C2.99927 12.6559 3.03546 12.8091 3.10498 12.948L5.10498 16.948C5.27498 17.286 5.62098 17.5 5.99998 17.5H10.382L12.106 20.947C12.1888 21.1132 12.3163 21.2531 12.4743 21.3507C12.6322 21.4484 12.8143 21.5001 13 21.5H18C18.379 21.5 18.725 21.286 18.895 20.947L20.895 16.947C20.9645 16.8081 21.0007 16.6549 21.0007 16.4995C21.0007 16.3441 20.9645 16.1909 20.895 16.052L19.118 12.5L20.894 8.947C20.9635 8.80828 20.9998 8.65528 20.9999 8.50012C21.0001 8.34495 20.9642 8.19188 20.895 8.053ZM13.618 5.5H17.382L18.882 8.5L17.382 11.5H13.618L12.118 8.5L13.618 5.5ZM5.11798 12.5L6.61798 9.5H10.382L11.882 12.5L10.382 15.5H6.61798L5.11798 12.5ZM17.382 19.5H13.618L12.118 16.5L13.618 13.5H17.382L18.882 16.5L17.382 19.5Z" /> </svg>
                      Roles
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
        </nav>
      </div>
  
      <div :style="[!authStore.loggedIn ? { width: '100%', padding: '0px' } : {}]" class="main-container" >
        <div class="desktop-view">
          <header v-if="authStore.loggedIn">
            <div class="search-bar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="#697A8D"/> </svg>
              <input type="text" placeholder="Search" />
            </div>
  
            <button @click="toggleSidebar" id="sidebarToggle">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" tag="i" class="v-icon notranslate v-theme--light iconify iconify--bx" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 24px; height: 24px; width: 24px"> <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path> </svg>
            </button>
  
            <div style="position: relative; display: flex; align-items: center; column-gap: 11px;">
              <a @click="toggleAccountDropdown"  href="#" class="avatar">
                {{ authStore.userName[0] }}
              </a>
              <div class="accountDropdown" :class="{ open: accountDropdown }">
                <ul>
                  <li>
                    <router-link to="/account">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"> </path> </svg>
                      Account</router-link>
                  </li>
                  <li>
                    <router-link to="/security">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"> </path> <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path> </svg>
                      Security</router-link>
                  </li>
                  <li>
                    <router-link to="/sessions">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"></path> <path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"> </path> </svg>
                      Sessions</router-link>
                  </li>
                  <li style=" border-top: thin solid rgba(50, 71, 92, 0.12); margin: 5px 0;"></li>
                  <li>
                    <a href="#" @click.prevent="logout">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path> <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"> </path> </svg>
                      Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
  
        <!-- <div class="mobile-view">
          <div v-if="showSearch" class="mobile-search-container">
            <form action="">
              <input type="text" placeholder="search" style="margin-bottom: 0px;">
              <span style="position: absolute; right: 28px; top: 28px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" @click=" toggleSearch()"> <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#697A8D" /> </svg>
              </span>
            </form>
          </div>
          <div class="mobile-navbar">
            <div style="margin: 0 auto;">
              <img @click="toggleSidebar" src="/images/svg/menu-32.svg" alt="menu" />
            </div>
            <div  @click="toggleSearch()" style="margin: 0 auto;">
              <img src="/images/svg/search-32.svg" alt="search" />
            </div>
            <div style="margin: 0 auto; position: relative;">
              <img  @click="toggleAccountDropdown" src="/images/svg/person-32.svg" alt="person" />
              <div :class="{ open: accountDropdown }" class="newaccountDropdown" >
                <ul>
                  <li>
                    <router-link to="/account">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"> </path> </svg>
                      Account</router-link>
                  </li>
                  <li>
                    <router-link to="/security">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"> </path> <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path> </svg>
                      Security</router-link>
                  </li>
                  <li>
                    <router-link to="/sessions">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M3 3v17a1 1 0 0 0 1 1h17v-2H5V3H3z"></path> <path d="M15.293 14.707a.999.999 0 0 0 1.414 0l5-5-1.414-1.414L16 12.586l-2.293-2.293a.999.999 0 0 0-1.414 0l-5 5 1.414 1.414L13 12.414l2.293 2.293z"> </path> </svg>
                      Sessions</router-link>
                  </li>
                  <li style=" border-top: thin solid rgba(50, 71, 92, 0.12); margin: 5px 0;"></li>
                  <li>
                    <a href="#" @click.prevent="logout">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path> <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"> </path> </svg>
                      Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
  
            </div>
          </div>
        </div> -->
  
        <div :style="[!authStore.loggedIn ? { 'margin-bottom': '0px' } : { 'margin-bottom': '70px' }]" class="desktop-view">
          <RouterView />
        </div>
        <div class="not-supported-container">
          <div class="logo-section">
            <div class="logo-container">
              <img src="/images/app_logo_lg.png" alt="app_logo">
            </div>
            <h4>App DNA</h4>
          </div>
          <p>App is not available on mobile. Please switch to desktop.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import router from "@/router/index";
import { useRoute, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api/api";
import { COLORS, capitalizeFirstLetter } from "@/utils";

const authStore = useAuthStore();
const route = useRoute();
const showSidebar = ref(false);
const accountDropdown = ref(false);
const showSearch = ref(false);
const brands = ref([]);
const colors = ref( COLORS);
const dropdownType = ref(null);
const dropdownBonus = ref(false)
const dropdownAdmin = ref(false)

onMounted(() => {
  authStore.loginFromStorage();
});

const toggleOpen = (type) => {
  if(type === "bonus") {
    dropdownBonus.value = !dropdownBonus.value;
  }
  if(type === "admin") {
    dropdownAdmin.value = !dropdownAdmin.value;
  }
}

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}

function toggleAccountDropdown() {
  accountDropdown.value = !accountDropdown.value;
}

async function logout() {
  const response = await api.auth.logout();

  if (response.status == 200) {
    authStore.logout();
    router.push("/login");
  }
  toggleAccountDropdown();
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
}

const checkActive = (type, isDropdown = false) => {
  const prefixes = type === "bonus" ? ["/welcome-offers", "/credit-from-csv"] : ["/games", "/users", "/roles"];
  const isActive = prefixes.some(
    (prefix) =>
      route.path.startsWith(prefix) || route.path.includes(prefix + "/")
  );
  return {
    backgroundColor: isActive ? "#f3f3ff !important" : "transparent !important",
    color: isActive ? "#696cff !important" : "#697A8D !important",
    fill: isActive ? "#696cff !important" : "#697A8D !important",
    'margin-bottom': isDropdown && dropdownType.value === type ? "16px !important" : "0px !important",
  };
};

const checkRoute = (route) => {
  const { path, to } = route;
  return (path === to || path.includes(to)) && to !== "/";
};

const getBrands = async () => {
  const response = await api.tenants.getTenants();
  const tenants = response.data.tenants;
  brands.value = tenants;

  if (tenants.length === 1){
    let { key, name, iconUrl } = tenants[0]
    authStore.setTenant(key, name, iconUrl);
  }

  setLogo(brands.value);
};

const setTenant = async (tenantId, name, icon) => {
  authStore.setTenant(tenantId, name, icon);
  router.push("/");
}

const setLogo = (brandsList) => {
  brandsList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    const selectedColor = colors.value[randomNumber];
    e.defaultLogo = selectedColor;
  });
  authStore.allTenants = brands.value;
};

watchEffect(() => {
  if (authStore.loggedIn) {
    getBrands();
  }
});

const getDefaultLogoColor = (name) => {
    return authStore.allTenants.find(item => item.name.toLocaleLowerCase() === authStore.tenantName.toLocaleLowerCase())?.defaultLogo[name]
}
</script>
