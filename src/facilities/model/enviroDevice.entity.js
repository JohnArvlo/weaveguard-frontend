export class EnviroDevice{
    constructor(
        {
            id = 0,
            name = '',
            model='',
            value=0,
            type='',
            unit='',
            depositId=''

        }
    ) {
        this.id = id;
        this.name = name;
        this.model=model;
        this.value=value;
        this.type=type;
        this.unit=unit;
        this.depositId=depositId;
    }
}