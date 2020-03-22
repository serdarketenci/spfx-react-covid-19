import { IItem } from ".";

export class Item implements IItem{
    constructor(options:IItem) {
        this.country=options.country;
        this.cases=options.cases;
        this.todayCases=options.todayCases;
        this.deaths=options.deaths;
        this.todayDeaths=options.todayDeaths;
        this.recovered=options.recovered;
        this.active=options.active;
        this.critical=options.critical;
        this.casesPerOneMillion=options.casesPerOneMillion;
    }
    public country: string;
    public cases: number;
    public todayCases: number;
    public deaths: number;
    public todayDeaths: number;
    public recovered: number;
    public active: number;
    public critical: number;
    public casesPerOneMillion: number;
}