import http from "../../shared/services/http-common.js"

export class StoreroomService {
    resourceEndpoint = '/storerooms';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(categoryResource) {
        return http.post(this.resourceEndpoint, categoryResource);
    }

    update(id, categoryResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, categoryResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }



    //AssignedFabrics
    getAssignedFabrics(id){
        return http.get(`${this.resourceEndpoint}/${id}/assignedFabrics`);
    }

    createAssignedFabric(id,assignedFabric){
        return http.post(`${this.resourceEndpoint}/${id}/assignedFabrics`,assignedFabric);
    }


    //ClimateSensors
    getClimateSensors(id){
        return http.get(`${this.resourceEndpoint}/${id}/climateSensors`);
    }
    createClimateSensor(id,climateSensor){
        return http.post(`${this.resourceEndpoint}/${id}/climateSensors`,climateSensor);
    }



    //EnviroDevices
    getEnviroDevices(id){
        return http.get(`${this.resourceEndpoint}/${id}/enviroDevices`);
    }

    createEnviroDevice(id,enviroDevice){
        return http.post(`${this.resourceEndpoint}/${id}/enviroDevices`,enviroDevice);
    }


}