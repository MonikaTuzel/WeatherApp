import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GroupOfWeather, WeatherResponse } from '../models/weatherResponse.model';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {

  getWeatherUrl = environment.apiPath;
  townList = environment.townsList
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    for (let town of this.townList) {
      let url = encodeURI(`${environment.apiPath}?q=${town.name},${town.country}&APPID=${environment.apiKey}`)

      this.http.get<WeatherResponse>(url).subscribe(weatherResponseTown => {
        this.totalAngularPackages = weatherResponseTown;

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

            town.viewerInfo.description = mainWeather.description ?? 'unknow';

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
          }
        }
      })
    }
  }

  convertTenpKtoC = (kelvinTemp?: number): string => {
    if (kelvinTemp !== undefined) {

      let temp = Number(kelvinTemp - 273.15).toFixed(0);

      return (`${temp}${String.fromCharCode(176)}C`)
    }
    else {
      return 'unknow';
    }
  }

}

