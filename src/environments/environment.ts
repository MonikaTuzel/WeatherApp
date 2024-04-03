import { TownModel } from "../app/models/town.model";
import { ViewWeatherTown } from "../app/models/weatherTownView.model";

export const environment = {
    apiPath: 'http://api.openweathermap.org/data/2.5/weather',
    apiPaqthForIcon: 'https://openweathermap.org/img/wn',

    apiKey: '94a40931dcdc59a86ab887f7d11d6e9a',
    townsList: [
        new TownModel('WARSAW', 'pl'),
        new TownModel('SRI LANKA', 'lk'),
        new TownModel('LOS ANGELES', 'us'),
        new TownModel('LONDON', 'uk'),
        new TownModel('TOKYO', 'jp'),
        new TownModel('JELENIA GÓRA', 'pl'),
    ]
};
