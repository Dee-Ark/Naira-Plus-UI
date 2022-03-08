import { Component, OnInit } from '@angular/core';
//import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-auth-logo',
  templateUrl: './auth-logo.component.html',
  styleUrls: ['./auth-logo.component.scss']
})
export class AuthLogoComponent implements OnInit {
  logo!: string;
  constructor(public appService:AppService) { }

  ngOnInit() {
    // this.store.select('customization').pipe(

    // )
    // .subscribe(
    //   res => {
    //     if(res){
    //       console.log("STORE:", res.customization)
    //       const data = res.customization
    //       const logo = _.filter(data, ['key', 'logo'])[0];
    //       //this.logo = this.appService.getImageById(logo);
    //       console.log(logo);
    //     }
    //   }
    // )
  }

}
