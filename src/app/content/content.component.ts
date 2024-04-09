import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TownService } from '../services/town.service';
import { TownModel } from '../models/town.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements AfterViewInit {

  townListNames = environment.townsList;

  townList: TownModel[] = [];

  constructor(private _townService: TownService) { }

  ngAfterViewInit() {
    for (let town of this.townListNames) {
      let townModel = this._townService.getTown(town);

      this.townList.push(townModel);
    }
  }
}