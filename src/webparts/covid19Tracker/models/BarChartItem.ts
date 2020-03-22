import { IBarChartItem } from ".";
import { Item } from "./Item";

export class BarChartItem implements IBarChartItem{
    constructor(options:IBarChartItem) {
        this.date=options.date;
        this.countries = options.countries;
    }
    public date: string;
    public countries: Item[];
}