<template>
  <div>
    <h1>Report Analysis</h1>
    <line-chart ref="lineChart" />
    <button @click="saveReport">Guardar Reporte</button>
    <button @click="loadReports">Cargar Reportes</button>
    <div v-if="reports.length > 0">
      <h3>Selecciona un reporte:</h3>
      <ul>
        <li v-for="report in reports" :key="report.id">
          <button @click="loadReport(report.id)">Reporte ID: {{ report.id }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LineChart from "../../shared/components/line-chart.component.vue";
import reportService from "../../reports/services/report.service.js";
import { Report } from "../model/report.entity.js";

export default {
  name: "ReportAnalysis",
  components: {
    LineChart,
  },
  data() {
    return {
      reports: [], // Lista de reportes guardados
      nextReportId: 1, // ID del próximo reporte
    };
  },
  methods: {
    async saveReport() {
      try {
        const chartData = this.$refs.lineChart.getChartData();
        const report = new Report({
          id: this.nextReportId, // Usar el próximo ID
          fabricsData: chartData.fabricsData,
          enviroDevicesData: chartData.enviroDevicesData,
          climateSensorsData: chartData.climateSensorsData,
        });

        await reportService.saveReport(report);
        this.nextReportId++; // Incrementar el ID para el próximo reporte
        alert("Reporte guardado exitosamente.");
      } catch (error) {
        console.error("Error al guardar el reporte:", error);
        alert("Hubo un error al guardar el reporte.");
      }
    },

    async loadReports() {
      try {
        const response = await reportService.getReports();
        this.reports = response.data; // Asignar los reportes a la lista
        this.nextReportId = this.reports.length + 1; // Ajustar el próximo ID basado en la cantidad de reportes existentes
      } catch (error) {
        console.error("Error al cargar los reportes:", error);
        alert("Hubo un error al cargar los reportes.");
      }
    },

    async loadReport(reportId) {
      try {
        const response = await reportService.getReportById(reportId);
        const report = response.data;

        // Actualizar la gráfica con los datos del reporte seleccionado
        this.$refs.lineChart.renderChart(
            report.fabricsData,
            report.enviroDevicesData,
            report.climateSensorsData
        );
      } catch (error) {
        console.error("Error al cargar el reporte:", error);
        alert("Hubo un error al cargar el reporte.");
      }
    },
  },
};
</script>