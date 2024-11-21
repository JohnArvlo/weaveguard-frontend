// src/facilities/model/contact.entity.js
export class Contact {
    constructor({
                    phone = '',
                    email = ''
                }) {
        this.phone = phone;
        this.email = email;
    }
}