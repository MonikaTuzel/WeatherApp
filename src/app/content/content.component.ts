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
  townNameList = setTownList();
  // townWeatherList = new Array<WeatherResponse>();
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    for (let townName of this.townNameList) {
      let url = encodeURI(`${environment.apiPath}?q=${townName.name},${townName.country}&APPID=${environment.apiKey}`)

      this.http.get<WeatherResponse>(url).subscribe(townWeather => {
        this.totalAngularPackages = townWeather;

        if (townWeather !== undefined) {
          if (townWeather.weather !== undefined) {
            let url = '../../assets/images';
            let codeTown = townWeather.weather[0].id;
            if (codeTown !== undefined) {
              switch (true) {
                case (codeTown >= 200 && codeTown < 300): {
                  townWeather.weatherMainUrl = `${url}/Thunderstorm.jpeg`;
                  break;
                }
                case (codeTown >= 300 && codeTown < 400): {
                  townWeather.weatherMainUrl = `${url}/Drizzle.jpeg`;
                  break;
                }
                case (codeTown >= 500 && codeTown < 600): {
                  townWeather.weatherMainUrl = `${url}/Rain.jpeg`;
                  break;
                }
                case (codeTown >= 600 && codeTown < 700): {
                  townWeather.weatherMainUrl = `${url}/Snow.jpeg`;
                  break;
                }
                case (codeTown > 700 && codeTown < 800): {
                  townWeather.weatherMainUrl = `${url}/Atmosphere.jpeg`;
                  break;
                }
                case (codeTown > 801 && codeTown < 900): {
                  townWeather.weatherMainUrl = `${url}/Clouds.jpeg`;
                  break;
                }
                default: {
                  townWeather.weatherMainUrl = `${url}/Clear.jpeg`;
                  break;
                }
              }
            }

            if (townWeather.weather[0].icon !== undefined) {
              townWeather.iconUrl = `${environment.apiPaqthForIcon}/${townWeather.weather[0].icon}`
            }

            townName.townWeather = townWeather;

            if (townName.townWeather.weather !== undefined) {
              console.log('townName1: ' + townName.name + ' | townWeatherID: ' + townName.townWeather.weather[0].id + ' | townWeatherURL: ' + townName.townWeather.weatherMainUrl);
            }
          }
        }
      })

    }

  }

}

