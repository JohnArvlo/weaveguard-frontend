import http from "../../shared/services/http-common.js";

export class FabricService {
    resourceEndpoint = 'api/v1/fabrics'; // Cambiado a /fabrics

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(fabricResource) { // Cambiado a fabricResource
        return http.post(this.resourceEndpoint, fabricResource);
    }

    update(id, fabricResource) { // Cambiado a fabricResource
        return http.put(`${this.resourceEndpoint}/${id}`, fabricResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByCode(code) { // Cambiado a findByCode
        return http.get(`${this.resourceEndpoint}?code=${code}`); // Cambiado a code
    }
}
