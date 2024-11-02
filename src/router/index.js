import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import TemperatureComponent from '../temperature/components/temperature.component.vue'; // Importa el componente de temperatura
import ReportAnalisisComponent from "../reports/components/report-analisis.component.vue";
import StoreroomManagementComponent from "../facilities/pages/storeroom-management.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',                    name: 'home',       component: HomeComponent,               meta: { title: 'Home'}},
        { path: '/publishing/categories',   name: 'categories', component: CategoryManagementComponent, meta: { title: 'Categories'}},
        { path: '/reportes-y-analisis',        name: 'analisis',   component: ReportAnalisisComponent,    meta: { title: 'Analisis'}},
        { path: '/temperature',             name: 'temperature', component: TemperatureComponent, meta: { title: 'Temperature' }}, // Agrega esta línea
        { path: '/management',             name: 'deposit', component: StoreroomManagementComponent, meta: { title: 'DepositManagement' }}, // Agrega esta línea
        { path: '/',                        redirect: '/home' }
    ]
});

router.beforeEach((to,
                   from,
                   next) => {
   let baseTitle = 'ACME Learning Center';
   document.title = `${baseTitle} | ${to.meta['title']}`;
   next();
});
export default router;