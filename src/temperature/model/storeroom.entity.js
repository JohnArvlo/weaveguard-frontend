import { Contact } from './contact.entity';
import { Temperature } from './temperature.entity';
import { Humidity } from './humidity.entity';

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