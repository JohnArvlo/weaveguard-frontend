<template>
  <div>
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import reportService from "../../reports/services/report.service.js";

Chart.register(...registerables);

export default {
  name: "LineChart",
  data() {
    return {
      chart: null,
      chartData: null,
    };
  },
  methods: {
    async fetchDataAndRenderChart() {
      try {
        const fabricsResponse = await reportService.getFabrics();
        const enviroDevicesResponse = await reportService.getEnviroDevices();
        const climateSensorsResponse = await reportService.getClimateSensors();

        const fabricsData = fabricsResponse.data.map((fabric) => fabric.quantity);
        const enviroDevicesData = enviroDevicesResponse.data.map((device) => device.value);
        const climateSensorsData = climateSensorsResponse.data.map((sensor) => sensor.id);

        this.chartData = { fabricsData, enviroDevicesData, climateSensorsData };
        this.renderChart(fabricsData, enviroDevicesData, climateSensorsData);
      } catch (error) {
        console.error("Error al obtener datos para la gráfica:", error);
      }
    },
    renderChart(fabricsData, enviroDevicesData, climateSensorsData) {
      if (this.chart) {
        this.chart.destroy(); // Destruir la instancia anterior del gráfico
      }

      const ctx = document.getElementById("lineChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Fabrics", "Enviro Devices", "Climate Sensors"],
          datasets: [
            {
              label: "Fabrics Quantities",
              data: fabricsData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.1,
            },
            {
              label: "Enviro Devices Values",
              data: enviroDevicesData,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.1,
            },
            {
              label: "Climate Sensors IDs",
              data: climateSensorsData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Categories",
              },
            },
            y: {
              title: {
                display: true,
                text: "Values",
              },
            },
          },
        },
      });
    },
    getChartData() {
      return this.chartData;
    },
  },
  mounted() {
    this.fetchDataAndRenderChart();
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 400px;
}
</style>