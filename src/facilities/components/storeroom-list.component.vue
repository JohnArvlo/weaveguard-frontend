<script>
import StoreroomItemComponent from "./storeroom-item.component.vue";

export default {
  name: "storeroom-list",
  components: { StoreroomItemComponent},
  props:{
    storerooms: {type: Array, required: true},
    deleteStoreroom: {type: Function, required: true},
    onEditRequested: { type: Function, required: true },
    onEditRequestedSensor: { type: Function, required: true },
    onEditRequestedDevice: { type: Function, required: true }

  },
  methods:{

  }
}


</script>

<template>
  <div>
    <div class="card-grid">
      <div v-for="storeroom in storerooms" :key="storeroom.id">
        <storeroom-item-component :storeroom="storeroom" :deleteStoreroom="deleteStoreroom" :onEditRequested="onEditRequested" :onEditRequestedSensor="onEditRequestedSensor" :onEditRequestedDevice="onEditRequestedDevice"/>

      </div>
    </div>

  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>