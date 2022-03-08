import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { AuthService, MerchantModel } from '../auth/auth.service';
//import { MerchantService } from '../pages/merchant/merchant.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isCollapsed = false;
  user: any;
  //merchants: MerchantModel[];
  //merchantCode: string;
  merchantCredentials: any;
  //loader: boolean;
  //isLive:boolean;
  //logo:string;
  
  constructor(private authService: AuthService, private router: Router, private appService:AppService) { }

  ngOnInit() {
    this.user = this.authService.userDetail;
    //this.merchants = this.authService.userMerchants
    //this.merchantCode = this.merchants[0].merchantCode;
    //this.onGetMerchantCredentials(this.merchantCode);

    // this.store.select('customization').pipe(

    // )
    // .subscribe(
    //   res => {
    //     if(res){
    //       const data = res.customization
    //       const logo = _.filter(data, ['key', 'logo'])[0];
    //       //this.logo = this.appService.getImageById(logo);
    //       console.log(logo);
    //     }
    //   }
    // );

    // this.store.select('authorization').pipe()
    // .subscribe(
    //   res => {
    //     console.log("authorization", res);
    //     if(res){
    //       //const data = res.customization
         
    //     }
    //   }
    // );
  }

  logout() {
    this.authService.logout();
  }

/*   onGetMerchantCredentials(merchants:string){
    if(!this.merchantCode){
      return
    }
    this.loader = true;
    this.merchantService.getMerchantCredentials(merchants)
    .pipe(finalize(() => this.loader = false))
    .subscribe((res) => {
      console.log(res)

      this.merchantCredentials = res.requestSuccessful ? [res.responseData] : null; 
      this.isLive = _.every(res.responseData.integrations, {env: 'Live'});

      console.log(this.isLive);
    });
  } */

}
