export class Report {
    constructor({
                    id = 0,
                    date = new Date().toISOString(),
                    fabricsData = [],
                    enviroDevicesData = [],
                    climateSensorsData = [],
                }) {
        this.id = id;
        this.date = date;
        this.fabricsData = fabricsData;
        this.enviroDevicesData = enviroDevicesData;
        this.climateSensorsData = climateSensorsData;
    }
}