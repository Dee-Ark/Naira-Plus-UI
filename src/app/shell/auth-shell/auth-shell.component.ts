import { Component, OnInit } from '@angular/core';
//import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-auth-shell',
  templateUrl: './auth-shell.component.html',
  styleUrls: ['./auth-shell.component.scss']
})
export class AuthShellComponent implements OnInit {
  name:string = 'Naira-Plus';

  constructor() { }

  ngOnInit() {
    // this.store.select('customization').subscribe(
    //   res => {
    //     if(res){

    //       this.name = res.name;
    //     }
    //   }
    // )
  }
  //public store:Store<{customization:any}>

}
