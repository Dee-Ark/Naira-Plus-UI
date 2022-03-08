import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor(private notification: NzNotificationService) {
  
   }

  createNotification(type = 'info', title:string, message: string){
    return this.notification.create(
      type,
      title,
      message
    );
  }

  formatMoney(number:number, code:string) {
    return number ? number.toLocaleString('en-US', { style: 'currency', currency: code }) : '0.0';
  }

 formatToCurrency(amount: any, currency: string) {
    const formatAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return currency ? `${currency} ${formatAmount}` : `${formatAmount}`;
  }

}