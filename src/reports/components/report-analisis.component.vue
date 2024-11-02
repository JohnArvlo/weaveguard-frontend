<script>
import LineChartComponent from "../../shared/components/line-chart.component.vue";
import axios from 'axios';

export default {
  components: {
    LineChartComponent,
  },
  data() {
    return {
      selectedWarehouse: null,
      reports: [],
      irregularities: 'No se encontraron irregularidades',
      temperatureData: {
        labels: ['Warehouse A', 'Warehouse B'],
        datasets: [
          {
            label: 'Temperatura (°C)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [],
          },
          {
            label: 'Humedad (%)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  watch: {
    selectedWarehouse(newWarehouse) {
      this.updateChartData(newWarehouse);
    },
  },
  methods: {
    async fetchReports() {
      try {
        const response = await axios.get('/server/db.json');
        this.reports = response.data.reports;
        this.updateChartData();
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    },
    updateChartData() {
      const temperatureData = [];
      const humidityData = [];

      this.reports.forEach(report => {
        temperatureData.push(report.temperature.actual);
        humidityData.push(report.humidity.actual);
      });

      this.temperatureData.datasets[0].data = temperatureData;
      this.temperatureData.datasets[1].data = humidityData;
    },
  },
  created() {
    this.fetchReports();
  },
};
</script>

<template>
  <div class="report-analysis">
    <h2>{{ $t('report.analysis') }}</h2>

    <!-- Sección de Informes por almacén -->
    <section>
      <h3>{{ $t('report.byWarehouse') }}</h3>
      <div>
        <label>{{ $t('inventory.storeroom') }}: </label>
        <select v-model="selectedWarehouse">
          <option v-for="report in reports" :key="report.id" :value="report">
            {{ report.name }}
          </option>
        </select>
      </div>
      <p>{{ $t('report.irregularities') }}: {{ irregularities }}</p>
    </section>

    <!-- Sección de Tendencias con gráfico de líneas -->
    <section>
      <h3>{{ $t('report.trends') }}</h3>
      <line-chart-component :chartData="temperatureData" :chartOptions="chartOptions"/>
    </section>

    <!-- Sección de Optimización de recursos -->
    <section>
      <h3>{{ $t('report.resourceOptimization') }}</h3>
      <p>{{ $t('report.optimizationAnalysis') }}</p>
    </section>
  </div>
</template>

<style scoped>
.report-analysis {
  padding: 40px;
}
</style>