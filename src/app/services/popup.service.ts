import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  public state = new Subject<boolean>();
  public msg = new Subject<string>();
  public msgDescription = new Subject<string>();

  constructor() { }
}
