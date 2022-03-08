import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-token',
  templateUrl: './change-token.component.html',
  styleUrls: ['./change-token.component.scss']
})

export class ChangeTokenComponent implements OnInit {
  authForm!: FormGroup;
  formloader!: boolean;
  showPassword: boolean = false;
  validations!: any[];
  strength: any;
  token!: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params["token"];
      if(!this.token){
        this.createNotification('error', 'Change Password', 'Not a valid token')
      }
    });

    this.createForm();
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.formloader = true;

      const data = {
        username: this.authForm.value.username,
        oldtransactioncode: this.authForm.value.oldtransactioncode,
        newtransactioncode: this.authForm.value.newtransactioncode,
        hashvalue: this.authForm.value.hashvalue
      }

      this.authService.changtoken(data).pipe(
        finalize(() => {
          this.formloader = false;
        })
      ).subscribe(res => {
        console.log(res)
        if(!res.requestSuccessful) return this.createNotification("error", "Change Token", res.message);

        this.createNotification("success", "Change Token", res.message);
        this.route.queryParams.subscribe(params =>
          this.router.navigate([params['redirect'] || '/login'], {
            replaceUrl: true
          })
          );
        }, error => {
          let er = JSON.parse(error)
        this.createNotification("error", "Change Token", er.error.message);
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
      oldtransactioncode: [null, [Validators.required, Validators.minLength(6)]],
      newtransactioncode: [null, [Validators.required, Validators.minLength(6)]],
      hashvalue: [
        "",
        Validators.compose([
          Validators.required,
          //CustomValidator.passwordMatchValidator
        ])
      ]
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
