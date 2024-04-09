///<reference types="@types/google.maps" /> 
import { Component, OnInit } from '@angular/core';
import { TownModel } from '../models/town.model';
import { ActivatedRoute } from '@angular/router';
import { TownService } from '../services/town.service';

@Component({
  selector: 'app-town-details',
  templateUrl: './town-details.component.html',
  styleUrl: './town-details.component.scss'
})

export class TownDetailsComponent implements OnInit {

  town?: TownModel;
  map?: google.maps.Map;
  center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };


  constructor(private route: ActivatedRoute, private _townService: TownService) { }

  ngOnInit() {
    let townID = this.route.snapshot.params['townID'];
    console.warn('Town details ID: ', townID);

    this.town = this._townService.findTownById(townID);

    if (this.town?.viewerInfo !== undefined) {

      document.documentElement.style.setProperty('--town-url', this.town.viewerInfo!.weatherMainUrl!);

      console.warn('name: ', this.town.name);

      if (this.town.lat !== undefined && this.town.lng !== undefined)
        this.initialMap(this.town.lat, this.town.lng);

    }
  }

  async initialMap(latPosition: number, lngPosition: number) {

    let mapElement = document.getElementById('map');

    if (mapElement !== null) {
      this.map = new google.maps.Map(mapElement, {
        center: { lat: latPosition, lng: lngPosition },
        zoom: 10
      });
    }
    else { console.error('Cannot create map element HTML') }
  }
}