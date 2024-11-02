<script>
import {Storeroom} from "../model/storeroom.entity.js";
import {StoreroomService} from "../services/storeroom.service.js";
import StoreroomList from "../components/storeroom-list.component.vue";

import StoreroomCreateAndEdit from "../components/storeroom-create-and-edit.component.vue";
import {ClimateSensor} from "../model/climateSensor.entity.js";
import ClimateSensorCreateAndEdit from "../components/climateSensor-create-and-edit.vue";
import EnviroDeviceCreateAndEdit from "../components/enviroDevice-create-and-edit.component.vue";
import {EnviroDevice} from "../model/enviroDevice.entity.js";





export default {
  name: "storeroom-management",
  components: {
    EnviroDeviceCreateAndEdit,
    ClimateSensorCreateAndEdit, StoreroomCreateAndEdit, StoreroomList
  },

  data() {
    return {
      storeroom: new Storeroom({}),
      climateSensor: new ClimateSensor({}),
      enviroDevice: new EnviroDevice({}),
      storerooms: [],
      //Sensor
      sensors: [],
      storeroomService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      //Sensor Dialog
      isEditSensor: false,
      createAndEditDialogIsVisibleSensor: false,

      //Device Dialog
      devices: [],
      createAndEditDialogIsVisibleDevice: false,
      isEditDevice: false,

    }
  },
  created() {
    this.storeroomService = new StoreroomService();
    this.loadStorerooms();
  },
  methods: {
    findIndexById(id) {
      return this.storerooms.findIndex((category) => category.id === id);
    },
    loadStorerooms()
    {
      this.storeroomService.getAll().then(response => {
        console.log(response.data);
        this.storerooms = response.data.map(storeroom => new Storeroom(storeroom));
        console.log(this.storerooms);
      }).catch(error => console.error(error));
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    //Sensor methods
    onCancelRequestedSensor() {
      this.createAndEditDialogIsVisibleSensor = false;
      this.submittedSensor = false;
      this.isEditSensor = false;
    },

    //Device methods
    onCancelRequestedDevice() {
      this.createAndEditDialogIsVisibleDevice = false;
      this.submittedDevice = false;
      this.isEditDevice = false;
    },

    //Sensor methods
    onSaveRequestedSensor(item) {
      console.log('onSaveRequestedSensor');
      this.submittedSensor = true;
      if (item.name.trim()) {
        this.climateSensor = item;
        if (item.id) {
          // Update logic here
        } else {
          this.createClimateSensor();
        }
        this.createAndEditDialogIsVisibleSensor = false;
        this.isEditSensor = false;
      }
    },

    //Device methods
    onSaveRequestedDevice(item) {
      console.log('onSaveRequestedDevice');
      this.submittedDevice = true;
      if (item.name.trim()) {
        this.enviroDevice = item;
        if (item.id) {
          // Update logic here
        } else {
          this.createEnviroDevice();
        }
        this.createAndEditDialogIsVisibleDevice = false;
        this.isEditDevice = false;
      }
    },

    //Sensor methods
    createClimateSensor() {
      console.log(this.storeroom.id);
      console.log(this.climateSensor);
      this.climateSensor.storeroomId = toString(this.storeroom.id);
      console.log(this.storeroom.id);
      console.log(this.climateSensor);
      this.storeroomService.createClimateSensor(this.storeroom.id, this.climateSensor).then(response => {
        let climateSensor = new ClimateSensor(response.data);
        this.sensors.push(climateSensor);
        this.loadStorerooms(); // Reload

      }).catch(error => console.error(error));
    },

    //Device methods
    createEnviroDevice(){
      this.enviroDevice.storeroomId = toString(this.storeroom.id);
      this.storeroomService.createEnviroDevice(this.storeroom.id, this.enviroDevice).then(response => {
        let enviroDevice = new EnviroDevice(response.data);
        this.devices.push(enviroDevice);
        this.loadStorerooms(); // Reload
      }).catch(error => console.error(error));
    },

    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.storeroom.name.trim()) {
        if (item.id) {
          this.updateStoreroom();
        } else {
          this.createStoreroom();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    // Service client methods
    createStoreroom() {
      this.storeroomService.create(this.storeroom).then(response => {
        let storeroom = new Storeroom(response.data);
        this.storerooms.push(storeroom);
        this.notifySuccessfulAction("Storeroom created successfully");
      }).catch(error => console.error(error));
    },
    updateStoreroom() {
      this.storeroomService.update(this.storeroom.id, this.storeroom).then(response => {
        console.log('updateStoreroom');
        let index = this.findIndexById(this.storeroom.id);
        this.storerooms[index] = new Storeroom(response.data);
        console.log(this.storerooms);
        this.notifySuccessfulAction("Storeroom updated successfully");
      }).catch(error => console.error(error));
    },
    deleteStoreroom(id) {
      this.storeroomService.delete(id).then(() => {
        let index = this.findIndexById(id);
        this.storerooms.splice(index, 1);
        this.notifySuccessfulAction("Storeroom deleted successfully");
        this.loadStorerooms(); // Recargar la lista de depósitos
      }).catch(error => console.error(error));
    },

    onNewItem() {
      this.storeroom = new Storeroom({});
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },

    onEditRequested(storeroom) {
      this.storeroom = storeroom;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    //Sensor methods
    onEditRequestedSensor(storeroom, sensor, type) {
      this.storeroom = storeroom;
      this.climateSensor = sensor;
      this.climateSensor.type=type;
      this.isEditSensor = true;
      this.createAndEditDialogIsVisibleSensor = true;
    },

    //Device methods
    onEditRequestedDevice(storeroom, device, type, unit) {
      this.storeroom = storeroom;
      this.enviroDevice = device;
      this.enviroDevice.type=type;
      this.enviroDevice.unit=unit;
      this.isEditDevice = true;
      this.createAndEditDialogIsVisibleDevice = true;
    }

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadStorerooms();
    });
  }
}






</script>

<template>
  <div class="w-full">
    <h1>{{ ('Editor de locales asignados') }}</h1>
    <p>{{ ('Aqui puede registrar sus almacenes y agregarles sensores') }}</p>
  </div>

  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="onNewItem"/>
    </template>
  </pv-toolbar>


  <storeroom-create-and-edit
      :edit="isEdit"
      :item="storeroom"
      :visible="createAndEditDialogIsVisible"
      v-on:cancel-requested="onCancelRequested"
      v-on:save-requested="onSaveRequested($event)"/>

  <climate-sensor-create-and-edit
      :edit="isEditSensor"
      :item="climateSensor"
      :visible="createAndEditDialogIsVisibleSensor"
      v-on:cancel-requested="onCancelRequestedSensor"
      v-on:save-requested="onSaveRequestedSensor($event)"/>

  <enviro-device-create-and-edit
      :edit="isEditDevice"
      :item="enviroDevice"
      :visible="createAndEditDialogIsVisibleDevice"
      v-on:cancel-requested="onCancelRequestedDevice"
      v-on:save-requested="onSaveRequestedDevice($event)"/>


  <div class="container">
    <storeroom-list :storerooms="storerooms" :deleteStoreroom="deleteStoreroom" :onEditRequested="onEditRequested"
                  :onEditRequestedSensor="onEditRequestedSensor"
                  :onEditRequestedDevice="onEditRequestedDevice"/>
  </div>




</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.pv-toolbar {
  background-color: #4CAF50; /* Toolbar background color */
  padding: 10px;
  border-radius: 4px;
}

.pv-button {
  background-color: #008CBA; /* Button color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pv-button:hover {
  background-color: #005f73; /* Darker shade on hover */
}

.mb-4 {
  margin-bottom: 16px; /* Margin for spacing */
}

.deposit-list {
  margin-top: 20px; /* Space above the deposit list */
  border: 1px solid #ddd; /* Border around the list */
  border-radius: 4px;
  overflow: hidden;
}

.deposit-list tr {
  transition: background-color 0.3s;
}

.deposit-list tr:hover {
  background-color: #f0f0f0; /* Highlight on hover */
}

.dialog {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
}

.dialog-content {
  padding: 20px;
}
</style>
