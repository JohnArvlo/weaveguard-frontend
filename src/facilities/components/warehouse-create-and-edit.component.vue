<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
export default {
  name: "warehouse-create-and-edit",
  components: {CreateAndEdit},
  props: {
    edit: Boolean,
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {

    },
    onSaveRequested() {

    }
  }
}

</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"

      :edit="edit"

      entity-name="Store Room"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
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
            <label for="location">Location</label>
            <pv-input-text id="name" v-model="item.location"
                           :class="{'p-invalid': submitted && !item.location }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="description">Description</label>
            <pv-input-text id="name" v-model="item.description"
                           :class="{'p-invalid': submitted && !item.description }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="capacity">Capacity</label>
            <pv-input-text id="name" v-model="item.capacity"
                           :class="{'p-invalid': submitted && !item.capacity< 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="phone">Phone</label>
            <pv-input-text id="phone" v-model="item.phone"
                           :class="{'p-invalid': submitted && !item.phone }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="email">Email</label>
            <pv-input-text id="phone" v-model="item.email"
                           :class="{'p-invalid': submitted && !item.email }"/>
          </pv-float-label>
        </div>

        <!-- New fields -->
        <div class="field mt-5">
          <pv-float-label>
            <label for="actualTemperature">Actual Temperature</label>
            <pv-input-text id="actualTemperature" v-model="item.actualTemperature"
                           :class="{'p-invalid': submitted && item.actualTemperature < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="maximumTemperature">Maximum Temperature</label>
            <pv-input-text id="maximumTemperature" v-model="item.maximumTemperature"
                           :class="{'p-invalid': submitted && item.maximumTemperature < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="minimumTemperature">Minimum Temperature</label>
            <pv-input-text id="minimumTemperature" v-model="item.minimumTemperature"
                           :class="{'p-invalid': submitted && item.minimumTemperature < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="temperatureUnit">Temperature Unit</label>
            <pv-input-text id="temperatureUnit" v-model="item.temperatureUnit"
                           :class="{'p-invalid': submitted && !item.temperatureUnit }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="actualHumidity">Actual Humidity</label>
            <pv-input-text id="actualHumidity" v-model="item.actualHumidity"
                           :class="{'p-invalid': submitted && item.actualHumidity < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="maximumHumidity">Maximum Humidity</label>
            <pv-input-text id="maximumHumidity" v-model="item.maximumHumidity"
                           :class="{'p-invalid': submitted && item.maximumHumidity < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="minimumHumidity">Minimum Humidity</label>
            <pv-input-text id="minimumHumidity" v-model="item.minimumHumidity"
                           :class="{'p-invalid': submitted && item.minimumHumidity < 0 }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="humidityUnit">Humidity Unit</label>
            <pv-input-text id="humidityUnit" v-model="item.humidityUnit"
                           :class="{'p-invalid': submitted && !item.humidityUnit }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>