import { Component, OnInit } from '@angular/core';
import { TownService } from '../services/town.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {

  townList = this._townService.townList;

  constructor(private _townService: TownService) { }

  ngOnInit() {
    for (let town of this.townList) {
      this._townService.getTown(town);
    }
  }
}