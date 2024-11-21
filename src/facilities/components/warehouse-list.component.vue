<script>
import WarehouseItemComponent from "./warehouse-item.component.vue";

export default {
  name: "warehouse-list",
  components: { WarehouseItemComponent},
  props:{
    warehouses: {type: Array, required: true},
    deleteWarehouse: {type: Function, required: true},
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
      <div v-for="warehouse in warehouses" :key="warehouse.id">
        <warehouse-item-component :warehouse="warehouse" :deleteWarehouse="deleteWarehouse" :onEditRequested="onEditRequested" :onEditRequestedSensor="onEditRequestedSensor" :onEditRequestedDevice="onEditRequestedDevice"/>

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