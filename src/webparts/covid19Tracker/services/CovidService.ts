import Constants from "../common/Constants";
import { ICovidService } from ".";
import { IItem, IBarChartItem, ITotalResultItem } from "../models";

export class CovidService implements ICovidService {

    public getAll(): Promise<IItem[]> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.WebServiceUrl}/countries`)
                .then((response) => response.json())
                .then((data:IItem[]) => {
                    resolve(data);
                })
                .then((err) => {
                    reject(err);
                });
        });
    }

    public getTotal(): Promise<ITotalResultItem> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.WebServiceUrl}/all`)
                .then((response) => response.json())
                .then((data:ITotalResultItem) => {
                    resolve(data);
                })
                .then((err) => {
                    reject(err);
                });
        });
    }

    public getTimeline(): Promise<IBarChartItem[]> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.WebServiceUrl}/timeline`)
                .then((response) => response.json())
                .then((data:IBarChartItem[]) => {
                    resolve(data);
                })
                .then((err) => {
                    reject(err);
                });
        });
    }
}