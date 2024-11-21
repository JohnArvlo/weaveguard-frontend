// src/facilities/model/humidity.entity.js
export class Humidity {
    constructor({
                    actual = 0,
                    maximum = 0,
                    minimum = 0,
                    unit = ''
                }) {
        this.actual = actual;
        this.maximum = maximum;
        this.minimum = minimum;
        this.unit = unit;
    }
}