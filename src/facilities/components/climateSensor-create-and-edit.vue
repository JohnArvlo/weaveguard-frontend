<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import axios from 'axios';

export default {
  name: "climateSensor-create-and-edit",
  components: {CreateAndEdit},
  props: {
    edit: Boolean,
    item: {
      type: Object,
      default: () => ({
        name: '',
        model: '',
        type: 0,
        image: '',
        warehouseId: ''
      })
    },
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequestedSensor() {
      // Lógica para cancelar
    },
    async onSaveRequestedSensor() {
      this.submitted = true;
      this.missingFields = [];

      if (!this.item.name) this.missingFields.push('Nombre');
      if (!this.item.model) this.missingFields.push('Modelo');
      if (!this.item.image) this.missingFields.push('Imagen');
      if (!this.item.warehouseId) this.missingFields.push('Warehouse ID');

      if (this.missingFields.length > 0) {
        console.error('Te faltan estos datos:', this.missingFields.join(', '));
        return;
      }

      // Convertir el campo type a número si es necesario
      if (typeof this.item.type === 'string') {
        this.item.type = this.convertTypeToNumber(this.item.type);
      }

      console.log('Datos enviados:', this.item);
      try {
        const response = await axios.post(`http://localhost:5116/api/v1/climate-sensors`, this.item);
        console.log('Climate Sensor created successfully:', response.data);
        // Lógica adicional después de la creación exitosa
      } catch (error) {
        console.error('Error creating Climate Sensor:', error);
      }
    },
    convertTypeToNumber(type) {
      const typeMapping = {
        'Thermometer': 0,
        'Hygrometer': 1
      };
      return typeMapping[type] !== undefined ? typeMapping[type] : NaN;
    }
  }
}
</script>

<template>

  <create-and-edit
      :entity="item"
      :visible="visible"

      :edit="edit"

      entity-name="Climate Sensor"
      @cancel-requested="onCancelRequestedSensor"
      @save-requested="onSaveRequestedSensor">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name"
                           :class="{'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="location">Model</label>
            <pv-input-text id="name" v-model="item.model"
                           :class="{'p-invalid': submitted && !item.model }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="description">Avatar</label>
            <pv-input-text id="name" v-model="item.image"
                           :class="{'p-invalid': submitted && !item.image }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="warehouseId">Warehouse ID</label>
            <pv-input-text id="warehouseId" v-model="item.warehouseId"
                           :class="{'p-invalid': submitted && !item.warehouseId }"/>
          </pv-float-label>
        </div>



      </div>
    </template>
  </create-and-edit>

</template>

<style scoped>

</style>