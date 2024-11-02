import http from "../../shared/services/http-common.js";

export class ClimateSensorService {
    resourceEndpoint = '/climateSensors';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(climateSensorResource) {
        return http.post(this.resourceEndpoint, climateSensorResource);
    }

    update(id, climateSensorResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, climateSensorResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }

    findByType(type) {
        return http.get(`${this.resourceEndpoint}?type=${type}`);
    }

    findByStoreroom(storeroomId) {
        return http.get(`${this.resourceEndpoint}?storeroomId=${storeroomId}`);
    }
}
