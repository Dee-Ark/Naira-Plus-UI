import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  authForm!: FormGroup;
  formloader: boolean = false;
  showPassword: boolean = false;
  validations!: any[];
  strength: any;
  show: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.formloader = true;

      const data = {
        username: this.authForm.value.username,
        newpassword: this.authForm.value.newpassword,
        verificationcode: this.authForm.value.verificationcode,
        hashvalue: this.authForm.value.hashvalue

      }

      this.authService.resetpassword(data).pipe(
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
      newpassword: [null, [Validators.required]],
      verificationcode: [null, [Validators.required]],
      hashvalue: [null, [Validators.required]],
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
