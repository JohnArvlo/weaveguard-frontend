export class ClimateSensor{
    constructor(
        {
            id=0,
            name='',
            model='',
            type='',
            image='',
            depositId=''
        }
    ) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.type = type;
        this.image = image;
        this.depositId = depositId;
    }
}