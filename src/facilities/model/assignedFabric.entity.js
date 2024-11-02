import {Temperature} from "./temperature.entity.js";
import {Humidity} from "./humidity.entity.js";
import {FabricType} from "./fabricType.entity.js";

export class AssignedFabric{
    constructor(
        {
            id=0,
            fabricType= new FabricType({}),
            storeroomId=''
        }
    ) {
        this.id=id;
        this.fabricType=fabricType;
        this.storeroomId=storeroomId;
    }
}