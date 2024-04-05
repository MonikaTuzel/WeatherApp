import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TownModel } from '../models/town.model';
import { environment } from '../../environments/environment';
import { WeatherResponse } from '../models/weatherResponse.model';
import { PopupService } from './popup.service';

@Injectable({
    providedIn: 'root'
})
export class TownService {

    constructor(private _http: HttpClient, private _popupService: PopupService) { }

    totalAngularPackages: any;
    townList = environment.townsList

    getTown(town: TownModel, newTown: boolean = false): TownModel {
        let url = encodeURI(`${environment.apiPath}?q=${town.name},${town.country}&APPID=${environment.apiKey}`)

        this._http.get<WeatherResponse>(url).subscribe(weatherResponseTown => {
            this.totalAngularPackages = weatherResponseTown;

            console.log(weatherResponseTown);

            if (weatherResponseTown !== undefined) {
                if (weatherResponseTown.weather !== undefined) {

                    let url = '../../assets/images';
                    let mainWeather = weatherResponseTown.weather[0];

                    let codeWetherFromTown = mainWeather.id;
                    if (codeWetherFromTown !== undefined) {

                        // set background of tile    
                        switch (true) {
                            case (codeWetherFromTown >= 200 && codeWetherFromTown < 300): {
                                url += `/Thunderstorm.jpeg`;
                                break;
                            }
                            case (codeWetherFromTown >= 300 && codeWetherFromTown < 400): {
                                url += `/Drizzle.jpeg`;
                                break;
                            }
                            case (codeWetherFromTown >= 500 && codeWetherFromTown < 600): {
                                url += `/Rain.jpeg`;
                                break;
                            }
                            case (codeWetherFromTown >= 600 && codeWetherFromTown < 700): {
                                url += `/Snow.jpeg`;
                                break;
                            }
                            case (codeWetherFromTown > 700 && codeWetherFromTown < 800): {
                                url += `/Atmosphere.jpeg`;
                                break;
                            }
                            case (codeWetherFromTown > 801 && codeWetherFromTown < 900): {
                                url += `/Clouds.jpeg`;
                                break;
                            }
                            default: {
                                url += `/Clear.jpeg`;
                                break;
                            }
                        }

                        town.viewerInfo!.weatherMainUrl = url;
                    }

                    // set URL to icon from API
                    if (mainWeather.icon !== undefined) {
                        town.viewerInfo!.iconUrl = `${environment.apiPaqthForIcon}/${mainWeather.icon}.png`
                    }

                    town.viewerInfo!.description = mainWeather.description ?? 'unknow';

                    if (weatherResponseTown.main !== undefined) {

                        // convert temp from K to C
                        town.viewerInfo!.temp = this.convertTenpKtoC(weatherResponseTown.main.temp);

                        // convert temp felt from K to C
                        town.viewerInfo!.feltTemp = this.convertTenpKtoC(weatherResponseTown.main.feels_like);

                        // set pressure [hPa]
                        town.viewerInfo!.pressure = `${weatherResponseTown.main.pressure}hPa` ?? 'unknow';

                        // set humidity [%]
                        town.viewerInfo!.humidity = `${weatherResponseTown.main.humidity}%` ?? 'unknow';

                        // set visibility [m/10km]
                        town.viewerInfo!.visibility = `${weatherResponseTown.visibility}m/10km` ?? 'unknow';

                        // set wind speed [m/s]
                        town.viewerInfo!.windSpeed = `${weatherResponseTown.wind?.speed}m/s` ?? 'unknow';

                        // set cloudiness [%]
                        town.viewerInfo!.clouds = `${weatherResponseTown.clouds?.all}%` ?? 'unknow';
                    }

                    if (newTown) {
                        this.townList.unshift(town);
                        this._popupService.state.next(true);
                        this._popupService.msg.next(`Success!`);
                        this._popupService.msgDescription.next(`Added new town ${town.name} with success!`);
                    }
                }
            }
            else {
                this._popupService.state.next(true);
                this._popupService.msg.next(`Failed!`);
                this._popupService.msgDescription.next(`Cannot find town: ${town.name}`);
            }
        })
        return town;
    }

    convertTenpKtoC(kelvinTemp?: number): string {
        if (kelvinTemp !== undefined) {

            let temp = Number(kelvinTemp - 273.15).toFixed(0);

            return (`${temp}${String.fromCharCode(176)}C`)
        }
        else {
            return 'unknow';
        }
    }
}