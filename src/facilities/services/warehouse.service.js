import http from "../../shared/services/http-common.js"

export class WarehouseService {
    resourceEndpoint = '/api/v1/warehouses';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(warehouseResource) {
        return http.post(this.resourceEndpoint, warehouseResource);
    }

    update(id, warehouseResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, warehouseResource);
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