<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'TelaSecure',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Inventory', to: '/publishing/categories', icon: 'folder' },
        { label: 'Facilities', to: '/management' ,icon: 'sun'},
        { label: 'Reports', to: '/reportes-y-analisis', icon: 'chart-line' },

      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="dark-toolbar">
      <template #start>
        <pv-button class="toolbar-icon" icon="pi pi-bars" id="bars-icon" @click="toggleDrawer"/>
        <img src="../public/telasecure-logo.png" class="telasecure-logo">
        <h3 class="title-color">TelaSecure</h3>
      </template>
      <!--
      <template #center>
        <div class="flex-column">
          <router-link v-for="item in items"
                       :key="item.label"
                       v-slot="{ navigate, href }"
                       :to="item.to" custom>
            <pv-button class="p-button-text no-border" :href="href" @click="navigate">{{item.label}}</pv-button>
          </router-link>
        </div>
      </template>-->
      <template #end>
        <router-link to="/sign-in">
          <pv-button class="toolbar-icon" id="sign-in-icon">Sign In</pv-button>
        </router-link>
        <router-link to="/sign-up">
          <pv-button class="toolbar-icon" id="sign-up-icon">Sign Up</pv-button>
        </router-link>
        <pv-button class="toolbar-icon" id="user-icon"><i class="pi pi-user"></i></pv-button>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer class="drawer-telasecure" v-model:visible="drawer">
      <template #header>
        <div class="drawer-title">
          <img src="../public/telasecure-logo.png" class="telasecure-logo">
          <h3>TelaSecure</h3>
        </div>
      </template>
      <div class="drawer-content">
        <router-link v-for="item in items"
                     :key="item.label"
                     v-slot="{ navigate, href }"
                     :to="item.to" custom>
          <pv-button class="drawer-button" :href="href" @click="navigate"><a :class="`pi pi-${item.icon}`"></a>{{item.label}}</pv-button>
        </router-link>
      </div>
    </pv-drawer>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>
/* Estilo para el toolbar azul oscuro */
.dark-toolbar {
  background-color: #003366; /* Azul oscuro */
  color: white; /* Color de texto blanco */
}

/* Estilo para los botones del toolbar sin borde */
.no-border {
  border: none; /* Elimina el borde de los botones */
  background: none; /* Elimina el fondo del botón */
  color: white; /* Asegura que el texto sea blanco */
}



/* Estilos para el sidebar */
.drawer-title {
  color: white;
  display: flex;
  justify-content: center;
}

.drawer-link {
  display: block; /* Hace que el enlace ocupe toda la línea */
  padding: 10px; /* Espaciado para el enlace */
  color: #003366; /* Color del texto del enlace */
  text-decoration: none; /* Sin subrayado */
}

.drawer-link:hover {
  background-color: #e6e6e6; /* Color de fondo al pasar el ratón */
}

.drawer-content{
  display: flex;
  flex-direction: column;
}

.drawer-button{
  margin: 1rem;
  background-color: black;
  border-color: black;
  text-align: left;
  color:white;
  display: flex;
  justify-content: left;
}

.drawer-button:hover{
  background-color: black !important;
  border-color: #003366 !important;
  color: #003366 !important;
}

#bars-icon{
  background-color: transparent;
  border: none;
}

#user-icon{
  background-color: black;
  border: none;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
}

/*toolbar end*/
.toolbar-icon{
  margin-right: 1rem;
}

</style>
