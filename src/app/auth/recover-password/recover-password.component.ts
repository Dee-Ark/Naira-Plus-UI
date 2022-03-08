import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})

export class RecoverPasswordComponent implements OnInit {
  authForm!: FormGroup;
  formloader: boolean = false;
  showPassword!: boolean;
  validations!: any[];
  strength: any;

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
        rememberme: this.authForm.value.rememberme
      }

      this.authService.recoverpassword(data).pipe(
        finalize(() => {
          this.formloader = false;
        })
      ).subscribe(res => {
        console.log(res)
        if(!res.requestSuccessful) return this.createNotification("error", "Recover Password", res.message);

        this.createNotification("success", "Recover Password", res.message);
        this.route.queryParams.subscribe(params => this.router.navigate([params['redirect'] || '/login']));
          console.log(res);
        }, error => {
          let er = JSON.parse(error)
        this.createNotification("error", "Recover Password", er.error.message);
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

  // onValidatePassword(event: any) {
  //   const confirmPassword = event.target.value;

  //   if (
  //     this.authForm.value.password !== this.authForm.value.confirmPassword
  //   ) {
  //     this.authForm.setErrors({ confirmPassword: true });
  //   } else {
  //     this.authForm.setErrors(null);
  //   }
  // }

  createForm(){
    this.authForm = this.fb.group({
      username: [null, [Validators.required]],
    })
  }

  createNotification(type = 'info', title:string, message: string): void {
    // this.notification.create(
    //   type,
    //   title,
    //   message
    // );
  }

}