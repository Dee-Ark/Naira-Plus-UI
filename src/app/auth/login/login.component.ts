import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { RoleService } from 'src/app/role/role.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;
  formloader: boolean = false;
  showPassword: boolean = false;
  validations!: any[];
  strength: any;
  show: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private roleService: RoleService) { }

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.formloader = true;

      const data = {
        username: this.authForm.value.username,
        password: this.authForm.value.password
      }

      this.authService.login(data).pipe(
        finalize(() => {
          this.formloader = false;
        })
      ).subscribe(res => {
        console.log(res)
        if(!res.requestSuccessful) return this.createNotification("error", "Login", res.message);

        this.createNotification("success", "Login", res.message);
        const merchantCode = res.responseData['merchants'][0].merchantCode
        
        this.authService.setCredentials(res.responseData)

        //return;
        
          console.log(res);
          
        }, error => {
          let er = JSON.parse(error)
        this.createNotification("error", "Login", er.error.message);
        console.log(er);
      })
    }
  }
  getUserRolebyMerchantCode(merchantCode:string){
    
    this.roleService.getUserRolePermissionbyMerchantCode(merchantCode).pipe(
      finalize(() => {
        this.formloader = false;
      })
    ).subscribe((res) => {
      const permissions = res.responseData.map((data:any) => {
        return {
          name: data.permission.permissionName,
          canRead: data.canRead,
          canAdd: data.canAdd,
          canEdit: data.canEdit,
          canDelete: data.canDelete,
        }
      })

      console.log("getUserRolebyMerchantCode", permissions);

      
      //this.store.dispatch(new LoadAuthoziration(res.responseData));
      sessionStorage.setItem('userpermission', JSON.stringify(permissions));
      this.route.queryParams.subscribe(params =>
        this.router.navigate([params['redirect'] || '/dashboard'], {
          replaceUrl: true
        })
      );
    });
  }

  onValidate(event: any) {
    const password = event.target.value;

    const total = password.length > 5;
    const character = password.search(/[A-Z]/) > -1;
    const numeric = password.search(/[0-9]/) > -1;
    const specialCharacter = password.search(/[$&:;+,=?@#.]/) > -1;
    this.validations = [total, character, numeric, specialCharacter];

    this.strength = this.validations.reduce((acc, cur) => acc + cur);
  }

  onValidatePassword(event: any) {
    const confirmPassword = event.target.value;

    if (
      this.authForm.value.password !== this.authForm.value.confirmPassword
    ) {
      this.authForm.setErrors({ confirmPassword: true });
    } else {
      this.authForm.setErrors(null);
    }
  }

  createForm(){
    this.authForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    })
  }

  createNotification(type = 'info', title:string, message: string): void {
    // this.notification.create(
    //   type,
    //   title,
    //   message
    // );
  }

  onShowPassword(){
    this.showPassword = !this.showPassword;
  }

}