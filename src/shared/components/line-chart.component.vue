<script setup>
import {ref, watch, onMounted} from 'vue';
import {Line} from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

import {Chart} from 'chart.js';

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
    }),
  },
});

const chartRef = ref < Chart | null > null;

onMounted(() => {
  if (chartRef.value) {
    chartRef.value.update();
  }
});

watch(
    () => props.chartData,
    (newData) => {
      if (chartRef.value) {
        chartRef.value.data = newData;
        chartRef.value.update();
      }
    },
    {deep: true}
);
</script>

<template>
  <Line ref="chartRef" :data="chartData" :options="chartOptions"/>
</template>

<style scoped>
div {
  width: 100%;
  height: 400px;
}
</style>