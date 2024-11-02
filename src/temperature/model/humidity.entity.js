export class Humidity{
    constructor(
        {
            maximum = 0,
            minimum = 0,
            unit = 'percent'
        }
    ) {
        this.maximum = maximum;
        this.minimum = minimum;
        this.unit = unit;
    }
}