import { IItem, IBarChartItem, ITotalResultItem } from "../models";

export interface ICovidService{
    getAll():Promise<IItem[]>;
    getTimeline():Promise<IBarChartItem[]>;
    getTotal():Promise<ITotalResultItem>;
}