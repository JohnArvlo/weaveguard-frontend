import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import TemperatureComponent from '../temperature/components/environment.component.vue'; // Importa el componente de temperatura
import ReportAnalisisComponent from "../reports/components/report-analisis.component.vue";
import WarehouseManagementComponent from "../facilities/pages/warehouse-management.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home'}},
        { path: '/publishing/categories',   name: 'categories', component: CategoryManagementComponent, meta: { title: 'Categories'}},
        { path: '/reportes-y-analisis',        name: 'analisis',   component: ReportAnalisisComponent,    meta: { title: 'Analisis'}},
        { path: '/temperature',             name: 'temperature', component: TemperatureComponent, meta: { title: 'Temperature' }}, // Agrega esta línea
        { path: '/management',             name: 'deposit', component: WarehouseManagementComponent, meta: { title: 'DepositManagement' }}, // Agrega esta línea
        { path: '/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}},
        { path: '/',                        redirect: '/home' }
    ]
});

router.beforeEach((to,
                   from,
                   next) => {
   let baseTitle = 'WeaveGuard';
   document.title = `${baseTitle} | ${to.meta['title']}`;
    authenticationGuard(to, from, next);
});
export default router;