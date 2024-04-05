import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements AfterViewInit, OnDestroy {

  subscription?: Subscription;

  public stateMsg?: string;
  public stateMsgDescription?: string;
  public open = false;

  constructor(private _popupService: PopupService) {
  }

  ngAfterViewInit() {
    this._popupService.state.subscribe({
      next: (state) => {
        if (state) {          
          this.open = true;
          this._popupService.msg.subscribe(
            msg => {
              this.stateMsg = msg;
              document.documentElement.style.setProperty(`--displayState`, 'flex'); 
            }
          );
          this._popupService.msgDescription.subscribe(
            msgDesc => {
              this.stateMsgDescription = msgDesc;
            }
          )
        }
        else
          this.stateMsg = '';
      }
    })
  }

  closePopup() {
    this.open = false;
    document.documentElement.style.setProperty(`--displayState`, 'none'); 
    this._popupService.state.subscribe({
      next: (state) => {
        state = false;
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
