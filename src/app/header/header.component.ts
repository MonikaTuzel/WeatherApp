import { isPlatformBrowser } from "@angular/common";
import { Component, OnInit, OnDestroy, signal, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, Subscription, interval, of, timer } from "rxjs";
import { map, share } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit, OnDestroy {

  time = new Date();
  currentTime = new Date();
  intervalId: any;
  subscription?: Subscription;
    
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

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
}
