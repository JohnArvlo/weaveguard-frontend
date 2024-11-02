export class Temperature {
    constructor(
        {
            maximum = 0,
            minimum = 0,
            unit = 'Celsius',

        }
    ) {
        this.maximum = maximum;
        this.minimum = minimum;
        this.unit = unit;
    }

}