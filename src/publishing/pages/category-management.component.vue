<script>
import { Fabric } from "../model/category.entity.js"; // Cambiado a Fabric
import { FabricService } from "../services/category.service.js"; // Cambiado a FabricService
import DataManager from "../../shared/components/data-manager.component.vue";
import FabricCreateAndEditDialog from "../components/category-create-and-edit.component.vue"; // Cambiado a FabricCreateAndEditDialog

export default {
  name: "fabric-management", // Cambiado a fabric-management
  components: { FabricCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: "Fabric", plural: "Fabrics" },
      fabrics: [], // Se llenará con la data desde el servicio
      fabric: new Fabric({}), // Cambiado a Fabric
      selectedFabrics: [], // Cambiado a fabrics
      fabricService: null, // Cambiado a fabricService
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "success", summary: "Success", detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.fabrics.findIndex((fabric) => fabric.id === id); // Cambiado a fabrics
    },
    onNewItem() {
      this.fabric = new Fabric({}); // Cambiado a Fabric
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.fabric = new Fabric(item); // Cambiado a Fabric
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.fabric = new Fabric(item); // Cambiado a Fabric
      this.deleteFabric(); // Cambiado a deleteFabric
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedFabrics = selectedItems; // Cambiado a fabrics
      this.deleteSelectedFabrics(); // Cambiado a deleteSelectedFabrics
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.fabric.name.trim()) { // Cambiado a name
        if (item.id) {
          this.updateFabric(); // Cambiado a updateFabric
        } else {
          this.createFabric(); // Cambiado a createFabric
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createFabric() { // Cambiado a createFabric
      this.fabricService.create(this.fabric) // Cambiado a fabricService
          .then(response => {
            let fabric = new Fabric(response.data); // Cambiado a Fabric
            this.fabrics.push(fabric); // Añadir nueva tela
            this.notifySuccessfulAction("Fabric created successfully");
          })
          .catch(error => console.error(error));
    },
    updateFabric() { // Cambiado a updateFabric
      this.fabricService.update(this.fabric.id, this.fabric) // Cambiado a fabricService
          .then(response => {
            let index = this.findIndexById(this.fabric.id);
            this.fabrics[index] = new Fabric(response.data); // Actualizar la tela
            this.notifySuccessfulAction("Fabric updated successfully");
          })
          .catch(error => console.error(error));
    },
    deleteFabric() { // Cambiado a deleteFabric
      this.fabricService.delete(this.fabric.id) // Cambiado a fabricService
          .then(() => {
            let index = this.findIndexById(this.fabric.id);
            this.fabrics.splice(index, 1); // Eliminar la tela
            this.notifySuccessfulAction("Fabric deleted successfully");
          })
          .catch(error => console.error(error));
    },
    deleteSelectedFabrics() { // Cambiado a deleteSelectedFabrics
      this.selectedFabrics.forEach((fabric) => { // Cambiado a fabrics
        this.fabricService.delete(fabric.id) // Cambiado a fabricService
            .then(() => {
              this.fabrics = this.fabrics.filter(f => f.id !== fabric.id); // Eliminar las telas seleccionadas
            })
            .catch(error => console.error(error));
      });
      this.notifySuccessfulAction("Selected Fabrics deleted successfully");
    }
  },
  created() {
    this.fabricService = new FabricService(); // Cambiado a FabricService
    this.fabricService.getAll() // Cambiado a fabricService
        .then(response => {
          this.fabrics = response.data.map(fabric => new Fabric(fabric)); // Cargar las telas desde el servidor
        })
        .catch(error => console.error(error));
  }
};
</script>

<template>
  <div class="w-full">
    <h3>{{ $t('inventory.manage') }}</h3>
    <data-manager
        :title="title"
        v-bind:items="fabrics"
    v-on:new-item-requested="onNewItem"
    v-on:edit-item-requested="onEditItem($event)"
    v-on:delete-item-requested="onDeleteItem($event)"
    v-on:delete-selected-items-requested="onDeleteSelectedItems($event)"
    >
    <template #custom-columns>
      <pv-column :sortable="true" field="id" header="ID" style="min-width: 12rem" />
      <pv-column :sortable="true" field="code" :header="$t('inventory.code')" style="min-width: 24rem" /> <!-- Agregado -->
      <pv-column :sortable="true" field="name" :header="$t('inventory.name')" style="min-width: 24rem" />
      <pv-column :sortable="true" field="storeroomId" :header="$t('inventory.storeroom')" style="min-width: 24rem" /> <!-- Cambiado a storeroomId -->
      <pv-column :sortable="true" field="categoryId" :header="$t('inventory.category')" style="min-width: 24rem" /> <!-- Cambiado a categoryId -->
      <pv-column :sortable="true" field="quantity" :header="$t('inventory.quantity')" style="min-width: 24rem" />
    </template>
    </data-manager>
    <fabric-create-and-edit-dialog
        :edit="isEdit"
        :item="fabric"
    :visible="createAndEditDialogIsVisible"
    v-on:cancel-requested="onCancelRequested"
    v-on:save-requested="onSaveRequested($event)"
    />
  </div>
</template>

<style scoped>
.w-full {
  padding: 3rem;
}
</style>
