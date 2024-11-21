<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import axios from 'axios';

export default {
  name: "enviroDevice-create-and-edit",
  components: {CreateAndEdit},
  props: {
    edit: Boolean,
    item: {
      type: Object,
      default: () => ({
        id: 0,
        name: '',
        model: '',
        value: 0,
        type: 0,
        unit: '',
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
    onCancelRequestedDevice() {
      // Lógica para cancelar
    },
    async onSaveRequestedDevice() {
      this.submitted = true;
      this.missingFields = [];

      if (!this.item.name) this.missingFields.push('Nombre');
      if (!this.item.model) this.missingFields.push('Modelo');
      if (!this.item.unit) this.missingFields.push('Unidad');
      if (!this.item.warehouseId) this.missingFields.push('Warehouse ID');

      if (this.missingFields.length > 0) {
        console.error('Te faltan estos datos:', this.missingFields.join(', '));
        return;
      }

      // Convertir los campos value y type a números si es necesario
      if (typeof this.item.value === 'string') {
        this.item.value = Number(this.item.value);
      }
      if (typeof this.item.type === 'string') {
        this.item.type = this.convertTypeToNumber(this.item.type);
      }

      console.log('Datos enviados:', this.item);
      try {
        const response = await axios.post(`http://localhost:5116/api/v1/enviro-devices`, this.item);
        console.log('Environment Device created successfully:', response.data);
        // Lógica adicional después de la creación exitosa
      } catch (error) {
        console.error('Error creating Environment Device:', error);
      }
    },
    convertTypeToNumber(type) {
      const typeMapping = {
        'Heater': 0,
        'Humidifier': 1
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
      entity-name="Environment Device"
      @cancel-requested="onCancelRequestedDevice"
      @save-requested="onSaveRequestedDevice">
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
            <label for="model">Model</label>
            <pv-input-text id="model" v-model="item.model"
                           :class="{'p-invalid': submitted && !item.model }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="value">Value</label>
            <pv-input-text id="value" v-model="item.value"
                           :class="{'p-invalid': submitted && !item.value }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="type">Type</label>
            <pv-input-text id="type" v-model="item.type"
                           :class="{'p-invalid': submitted && !item.type }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="unit">Unit</label>
            <pv-input-text id="unit" v-model="item.unit"
                           :class="{'p-invalid': submitted && !item.unit }"/>
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
/* Estilos personalizados */
</style>