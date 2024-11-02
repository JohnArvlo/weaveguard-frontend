import http from '../../shared/services/http-common.js';
import { Report } from '../model/report.entity.js';

export class ReportService {
    async getReports() {
        const response = await http.get('/reports');
        return response.data.map(reportData => new Report(reportData));
    }
    async getReportById(id) {
        const response = await http.get(`/reports/${id}`);
        return new Report(response.data);
    }
    async createReport(report) {
        const response = await http.post('/reports', report);
        return new Report(response.data);
    }
    async updateReport(id, report) {
        const response = await http.put(`/reports/${id}`, report);
        return new Report(response.data);
    }
    async deleteReport(id) {
        const response = await http.delete(`/reports/${id}`);
        return response.data;
    }
}