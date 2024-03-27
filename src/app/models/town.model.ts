import { ViewWeatherTown } from "./weatherTownView.model";

export class TownModel {
    name?: string;
    country?: string;
    public viewerInfo?: ViewWeatherTown;
}

export function setTownList(): Array<TownModel> {
    let townList: Array<TownModel> = [
        { name: 'Warsaw', country: 'pl', viewerInfo: new ViewWeatherTown() },
        { name: 'Sri Lanka', country: 'lk', viewerInfo: new ViewWeatherTown() },
        { name: 'Los Angeles', country: 'us', viewerInfo: new ViewWeatherTown() },
        { name: 'London', country: 'uk', viewerInfo: new ViewWeatherTown() },
        { name: 'Tokyo', country: 'jp', viewerInfo: new ViewWeatherTown() }
    ];

    return townList;
}