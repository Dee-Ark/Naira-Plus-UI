import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../core/base.service';

const routes = {
  settings: "/api/PageCustomization/supermerchant-settings",
};

@Injectable({
  providedIn: 'root'
})

export class AppService extends BaseService<any> {

  constructor(private http: HttpClient) {
    super(http);
  }

  // getPageCustomizationBySuperMerchant(merchantId:string): Observable<any> {
  //   return this.sendGet(`${routes.settings}/${merchantId}`);
  // }

  // getImageById(logo:any): string{
  //   return logo ? `${environment.baseUrl}/api/PageCustomization/download/${logo.id}` : 'assets/svgs/logo.svg';
  // }

  // setPrimaryColor(color:string = '#00a049'){
  //   document.documentElement.style.setProperty('--primary-color', color);
  // }

  // setPrimaryLightColor(color:string = '#23bf76'){
  //   document.documentElement.style.setProperty('--primary-color-light', color);
  // }
  
  // setSecondaryColor(color:string="#23bf76"){
  //   document.documentElement.style.setProperty('--secondary-color', color);
  // }
  // setBackgroundColor(color:string='#fff'){
  //   document.documentElement.style.setProperty('--background-color', color);
  // }
  // setSideBarTextColor(color:string='rgba(255, 255, 255, 0.65)'){
  //   document.documentElement.style.setProperty('--sidebar-text-color', color);
  // }
  // setSideBarHoverTextColor(color:string='#fff'){
  //   document.documentElement.style.setProperty('--sidebar-hover-text-color', color);
  // }
  // setSidebarBackgroundColor(color:string='#001529'){
  //   document.documentElement.style.setProperty('--sidebar-background', color);
  // }

  // setBorderColor(color:string='#e4e4e4'){
  //   document.documentElement.style.setProperty('--border-color', color);
  // }
  // setTitleColor(color:string='#2f3d4d'){
  //   document.documentElement.style.setProperty('--title-color', color);
  // }

  // setTextColor(color:string = "#2f3d4d"){
  //   document.documentElement.style.setProperty('--text-color', color);
  // }
  // setButtonTextColor(color:string = "#fff"){
  //   document.documentElement.style.setProperty('--button-text-color', color);
  // }
  // setButtonTextHoverColor(color:string = "#fff"){
  //   document.documentElement.style.setProperty('--button-text-hover-color', color);
  // }
  // setMerchantNameColor(color:string = "#6c757d"){
  //   document.documentElement.style.setProperty('--merchant-name-color', color);
  // }
  // setTransferDetailBackgroundColor(color:string = "#f4f4f4"){
  //   document.documentElement.style.setProperty('--transfer-detail-background-color', color);
  // }
  // setTransferDetailTextColor(color:string = "#2f3d4d"){
  //   document.documentElement.style.setProperty('--transfer-detail-text-color', color);
  // }
  // setFontSize(size:string = '14px'){
  //   document.documentElement.style.setProperty('--font-size', size);
  // }
  // setTitleFontSize(size:string = '18px'){
  //   document.documentElement.style.setProperty('--title-size', size);
  // }
  // setMerchantNameFontSize(size:string = '24px'){
  //   document.documentElement.style.setProperty('--merchant-name-font-size', size);
  // }

  // setFontName(font:string = '"Karla", sans-serif'){
  //   document.documentElement.style.setProperty('--font-name', font);
  // }

  getAppSetting() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', 'assets/config/appSetting.json');
      req.onload = () => {
        resolve(JSON.parse(req.response));
      };

      req.send();
    });
  }
}
