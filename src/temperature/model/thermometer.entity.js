export class Thermometer {
    constructor({
                    id = '',
                    name = '',
                    model = '',
                    warehouseId = ''
                }) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.warehouseId = warehouseId;
    }
}
