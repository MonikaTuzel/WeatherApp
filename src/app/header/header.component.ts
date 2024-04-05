import { isPlatformBrowser } from "@angular/common";
import { Component, OnInit, OnDestroy, signal, Inject, PLATFORM_ID } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { TownService } from "../services/town.service";
import { TownModel } from "../models/town.model";
import { PopupService } from "../services/popup.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {

  constructor(@Inject(PLATFORM_ID) platformId: object, private formBuilder: FormBuilder, private _townService: TownService, private _popupService: PopupService) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  time = new Date();
  currentTime = new Date();
  intervalId: any;
  subscription?: Subscription;

  newTownForm = this.formBuilder.group({
    nameNewTown: ['', Validators.required],
    codeCountryNewTown: [''],
  });

  isBrowser = signal(false);

  ngOnInit() {
    if (this.isBrowser()) {

      this.intervalId = setInterval(() => {
        this.time = new Date();
      }, 1000);

      // Using RxJS Timer
      this.subscription = timer(0, 1000)
        .pipe(
          map(() => new Date()),
          share()
        )
        .subscribe(time => {
          this.currentTime = time;
        });
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public addNewTown() {

    let nameTown = (this.newTownForm.controls.nameNewTown.value as string)?.toUpperCase()
    let codeCountry = (this.newTownForm.controls.codeCountryNewTown.value as string)?.toUpperCase()

    if (!this._townService.townList.some(x => x.name === nameTown)) {
      let townNew = this._townService.getTown(new TownModel(nameTown, codeCountry), true);
    }
    else {
      console.log('Town existed');

      this._popupService.state.next(true);
      this._popupService.msg.next(`Failed!`);
      this._popupService.msgDescription.next(`Town ${nameTown} already exists`);
    }
  }

  onSubmit() {
    console.warn(this.newTownForm.value);
  }
}