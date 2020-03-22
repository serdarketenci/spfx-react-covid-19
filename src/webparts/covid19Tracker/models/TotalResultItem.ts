import { ITotalResultItem } from ".";

export class TotalResultItem implements ITotalResultItem{
    constructor(options:ITotalResultItem) {
        this.cases=options.cases;
        this.deaths=options.deaths;
        this.recovered=options.recovered;
    }
    cases: number;
    deaths: number;
    recovered: number;
}