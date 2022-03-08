import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
//import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Naira-Plus-UI';
  isCollapsed = false;
  timerInterval: any;
  countDownInterval: any;
  counter: any;
  isIdle = false;

  logo:string = 'assets/svgs/logo.svg';
  poweredByLogo:string = 'assets/svgs/logo.svg';

  constructor( private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private titleService:Title, public appService:AppService){

  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      console.log = function() {};
    }
  }

  dynamicTitle(name = 'Naira-Plus'){
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while(route.firstChild) route = route.firstChild
        return route
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event:any) =>  this.titleService.setTitle(`${name} Naira-Plus Portal | ${event['title']}`))

  }

  startCountdown(minutes: any) {
    clearInterval(this.timerInterval);
    this.counter = '';
    this.isIdle = true;
    let time = minutes * 60;
    let tmp = time;
    let val;

    this.timerInterval = setInterval(() => {
      var c = tmp--,
        m = (c / 60) >> 0,
        s = c - m * 60;
      this.counter = m + ':' + (String(s).length > 1 ? '' : '0') + s;
      //this.counter =

      if (m <= 0 && s <= 0) {
        clearInterval(this.timerInterval);

        this.auth.logout();
      }

      // console.log(m, s);
    }, 1000);
  }

  countdown(minutes: any) {
    this.isIdle = false;
    clearInterval(this.countDownInterval);
    clearInterval(this.timerInterval);

    let time = minutes * 60;
    let tmp = time;
    let val;

    this.countDownInterval = setInterval(() => {
      var c = tmp--,
        m = (c / 60) >> 0,
        s = c - m * 60;

      // console.log(m, s);

      if (m <= 0 && s <= 0) {
        this.isIdle = true;
        this.startCountdown(1);
        clearInterval(this.countDownInterval);
        //this.auth.logout();
      }
    }, 1000);
  }

  // @HostListener('document:keyup', ['$event'])
  // @HostListener('document:click', ['$event'])
  // @HostListener('document:wheel', ['$event'])
  // @HostListener('document:mousemove', ['$event'])
  // resetTimer() {
  //   // user action occured
  //   if (this.auth.isAuthenticated) {
  //     this.countdown(5);
  //   } else {
  //     event.stopPropagation();
  //   }
  // }
}
