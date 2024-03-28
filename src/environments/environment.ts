import { TownModel } from "../app/models/town.model";
import { ViewWeatherTown } from "../app/models/weatherTownView.model";

export const environment = {
    apiPath: 'http://api.openweathermap.org/data/2.5/weather',
    apiPaqthForIcon: 'https://openweathermap.org/img/wn',

    apiKey: '94a40931dcdc59a86ab887f7d11d6e9a',
    townsList: [
        { name: 'Warsaw', country: 'pl', viewerInfo: new ViewWeatherTown },
        { name: 'Sri Lanka', country: 'lk', viewerInfo: new ViewWeatherTown },
        { name: 'Los Angeles', country: 'us', viewerInfo: new ViewWeatherTown },
        { name: 'London', country: 'uk', viewerInfo: new ViewWeatherTown },
        { name: 'Tokyo', country: 'jp', viewerInfo: new ViewWeatherTown },
        { name: 'Jelenia Góra', country: 'pl', viewerInfo: new ViewWeatherTown }
    ]
};
