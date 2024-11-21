export class Fabric {
    constructor({ id = '',  name = '', warehouseId = '', categoryId = '', quantity = 0 }) {
        this.id = id;
        this.name = name;
        this.warehouseId = warehouseId;
        this.categoryId = categoryId;
        this.quantity = quantity;
    }
}

