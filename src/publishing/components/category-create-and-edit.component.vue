<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "fabric-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: Object, // Mantener como Object para reflejar la estructura esperada
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },

}
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Fabric"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="code">{{$t('inventory.code')}}</label>
            <pv-input-text id="code" v-model="item.code"
                           :class="{'p-invalid': submitted && !item.code }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">{{$t('inventory.name')}}</label>
            <pv-input-text id="name" v-model="item.name"
                           :class="{'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="storeroomId">{{$t('inventory.storeroom')}}</label>
            <pv-input-text id="storeroomId" v-model="item.storeroomId"
                           :class="{'p-invalid': submitted && !item.storeroomId }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="categoryId">{{$t('inventory.category')}}</label>
            <pv-input-text id="categoryId" v-model="item.categoryId"
                           :class="{'p-invalid': submitted && !item.categoryId }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="quantity">{{$t('inventory.quantity')}}</label>
            <pv-input-text id="quantity" v-model.number="item.quantity"
                           :class="{'p-invalid': submitted && item.quantity < 0}"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
</style>
