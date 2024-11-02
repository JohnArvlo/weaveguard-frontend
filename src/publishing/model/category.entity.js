export class Fabric {
    constructor({ id = '', code = '', name = '', storeroomId = '', categoryId = '', quantity = 0 }) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.storeroomId = storeroomId;
        this.categoryId = categoryId;
        this.quantity = quantity;
    }
}

