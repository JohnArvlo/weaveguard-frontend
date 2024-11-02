export class Report {
    constructor({ id, name, location, description, capacity, contact, temperature, humidity }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.capacity = capacity;
        this.contact = contact;
        this.temperature = temperature;
        this.humidity = humidity;
    }
}