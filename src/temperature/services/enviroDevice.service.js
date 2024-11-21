import http from "../../shared/services/http-common.js";

export class EnviroDeviceService {
    resourceEndpoint = '/api/v1/enviro-devices';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(enviroDeviceResource) {
        return http.post(this.resourceEndpoint, enviroDeviceResource);
    }

    update(id, enviroDeviceResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, enviroDeviceResource);
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
