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
  <div class="fabric-management">
    <h3 class="title">{{ $t('inventory.manage') }}</h3>
    <data-manager
        :title="title"
        v-bind:items="fabrics"
        v-on:new-item-requested="onNewItem"
        v-on:edit-item-requested="onEditItem($event)"
        v-on:delete-item-requested="onDeleteItem($event)"
        v-on:delete-selected-items-requested="onDeleteSelectedItems($event)"
        class="data-container"
    >
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="ID" class="column" />

        <pv-column :sortable="true" field="name" :header="$t('inventory.name')" class="column" />
        <pv-column :sortable="true" field="warehouseId" :header="$t('inventory.warehouse')" class="column" />
        <pv-column :sortable="true" field="categoryId" :header="$t('inventory.category')" class="column" />
        <pv-column :sortable="true" field="quantity" :header="$t('inventory.quantity')" class="column" />
      </template>
    </data-manager>
    <fabric-create-and-edit-dialog
        :edit="isEdit"
        :item="fabric"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"
        class="dialog"
    />
  </div>
</template>

<style scoped>
/* Variables para diseño moderno */
:root {
  --primary-color: #1f2937; /* Gris oscuro */
  --secondary-color: #4b5563; /* Gris medio */
  --accent-color: #3b82f6; /* Azul eléctrico */
  --background-color: #111827; /* Fondo oscuro */
  --text-color: #f9fafb; /* Blanco */
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.fabric-management {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--accent-color);
}

.data-container {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.column {
  text-align: left;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
}

.dialog {
  padding: 1rem;
  background: var(--secondary-color);
  border-radius: var(--border-radius);
}

button {
  background-color: var(--accent-color);
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

button:focus {
  outline: 2px solid var(--accent-color);
}

@media (max-width: 768px) {
  .fabric-management {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
