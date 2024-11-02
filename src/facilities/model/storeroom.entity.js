import {Contact} from "./contact.entity.js";
import {Temperature} from "./temperature.entity.js";
import {Humidity} from "./humidity.entity.js";

export class Storeroom{
    constructor(
        {
            id=0,
            name='',
            location='',
            description='',
            capacity=0,
            contact= new Contact({}),
            temperature= new Temperature({}),
            humidity = new Humidity({}),
        }
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.capacity = capacity;
        this.contact = contact;
        this.temperature = temperature;
        this.humidity = humidity;
    }}