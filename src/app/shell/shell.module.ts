import { Shell } from './shell.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
//import { NgZorroAntdModule } from 'ng-zorro-antd';
//import { IconsProviderModule } from '../icons-provider.module';
import { RouterModule } from '@angular/router';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { FormsModule } from '@angular/forms';
//import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AuthShellComponent, ShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    //IconsProviderModule,
    //NgZorroAntdModule,
    //SharedModule
  ],
  providers:[
    Shell
  ]
})
export class ShellModule { }
