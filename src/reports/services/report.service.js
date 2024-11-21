import http from "../../shared/services/http-common.js";

class ReportService {
    reportEndpoint = '/reports';
    fabricsEndpoint = 'api/v1/fabrics';
    enviroDevicesEndpoint = 'api/v1/enviro-devices';
    climateSensorsEndpoint = 'api/v1/climate-sensors';

    getFabrics() {
        return http.get(this.fabricsEndpoint);
    }

    getEnviroDevices() {
        return http.get(this.enviroDevicesEndpoint);
    }

    getClimateSensors() {
        return http.get(this.climateSensorsEndpoint);
    }

    saveReport(report) {
        return http.post(this.reportEndpoint, report);
    }

    getReports() {
        return http.get(this.reportEndpoint);
    }

    getReportById(reportId) {
        return http.get(`${this.reportEndpoint}/${reportId}`);
    }
}

export default new ReportService();