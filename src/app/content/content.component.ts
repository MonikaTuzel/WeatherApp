import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { setTownList } from '../models/town.model';
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
  townList = setTownList();
  // townWeatherList = new Array<WeatherResponse>();
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

            let codeWetherFromTown = weatherResponseTown.weather[0].id;
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
            if (weatherResponseTown.weather[0].icon !== undefined) {
              town.viewerInfo!.iconUrl = `${environment.apiPaqthForIcon}/${weatherResponseTown.weather[0].icon}.png`
            }

            // convert temp from K to C
            let temperature = '-';
            if (weatherResponseTown.main?.temp !== undefined) {
              temperature = this.convertTenpKtoC(weatherResponseTown.main.temp);
            }

            town.viewerInfo!.temp = temperature;

          }
        }
      })
    }
  }

  convertTenpKtoC = (kelvinTemp: number): string => {
    let temp = Number(kelvinTemp - 273.15).toFixed(0);

    return (`${temp}${String.fromCharCode(176)}C`)
  }

}

