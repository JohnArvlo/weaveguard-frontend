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
            <label for="name">{{$t('inventory.name')}}</label>
            <pv-input-text id="name" v-model="item.name"
                           :class="{'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="warehouseId">{{$t('inventory.warehouse')}}</label>
            <pv-input-text id="warehouseId" v-model="item.warehouseId"
                           :class="{'p-invalid': submitted && !item.warehouseId }"/>
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
/* Variables de estilo */
:root {
  --primary-bg: #1e1e2f; /* Fondo oscuro */
  --secondary-bg: #2d2d3f; /* Fondo más claro */
  --accent-color: #7b3fe4; /* Púrpura brillante */
  --accent-gradient: linear-gradient(45deg, #7b3fe4, #00d4ff); /* Degradado púrpura a azul */
  --error-color: #ff5c5c; /* Rojo de error */
  --text-color: #eaeaea; /* Blanco roto */
  --placeholder-color: #7e7e8f; /* Gris suave */
  --border-radius: 10px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  --input-border: 1px solid rgba(255, 255, 255, 0.1);
  --input-hover-border: 1px solid rgba(123, 63, 228, 0.8);
  --transition-speed: 0.3s;
}

/* Contenedor principal */
.p-fluid {
  background-color: var(--primary-bg);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-width: 600px;
  margin: 0 auto;
  animation: fadeIn var(--transition-speed) ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Etiquetas flotantes */
.field {
  margin-bottom: 1.5rem;
  position: relative;
}

.field label {
  color: var(--placeholder-color);
  font-size: 0.85rem;
  transition: color var(--transition-speed);
}

.field label.focused {
  color: var(--accent-color);
}

/* Entradas de texto */
.pv-input-text {
  width: 100%;
  background: var(--secondary-bg);
  border: var(--input-border);
  border-radius: var(--border-radius);
  padding: 0.75rem;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
}

.pv-input-text:focus {
  border: var(--input-hover-border);
  outline: none;
  box-shadow: 0 0 10px rgba(123, 63, 228, 0.6);
}

/* Estados de error */
.p-invalid {
  border: 1px solid var(--error-color);
  box-shadow: 0 0 8px rgba(255, 92, 92, 0.5);
}

.p-invalid:focus {
  border-color: var(--error-color);
  box-shadow: 0 0 12px rgba(255, 92, 92, 0.8);
}

/* Botón en CreateAndEdit */
.create-and-edit__button {
  background: var(--accent-gradient);
  color: var(--text-color);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  transition: background var(--transition-speed), transform var(--transition-speed);
}

.create-and-edit__button:hover {
  background: linear-gradient(45deg, #00d4ff, #7b3fe4);
  transform: translateY(-3px);
}

.create-and-edit__button:active {
  transform: translateY(1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Diseño de entradas en columnas */
.field.mt-5 {
  margin-top: 1.5rem;
}

/* Diálogo emergente con animación */
.create-and-edit-dialog {
  animation: scaleIn var(--transition-speed) ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
