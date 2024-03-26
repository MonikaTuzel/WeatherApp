import { WeatherResponse } from "./weatherResponse.model";

export class TownModel {
    name?: string;
    country?: string;
    townWeather?: WeatherResponse;
}

export function setTownList(): Array<TownModel> {
    let townList: Array<TownModel> = [
        { name: 'Warsaw', country: 'pl' },
        { name: 'Colombo', country: 'lk' },
        { name: 'Los Angeles', country: 'us' },
        { name: 'London', country: 'uk' },
        { name: 'Tokyo', country: 'jp' }
    ];

    return townList;
}