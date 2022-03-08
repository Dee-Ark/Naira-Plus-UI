import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/base.service';
import { environment } from 'src/environments/environment';



export interface Credentials {
  expiredIn: number;
    merchants: MerchantModel[]
    user: MerchantModel[]
    accessToken: string
}

export interface MerchantModel{
  businessType: string;
  contactEmail: string;
  countryCode: string;
  industryCategoryId: number;
  isWhitelisted: boolean;
  merchantCode: string;
  merchantName: string;
  registrationType: string;
  status: string;
}
// export interface UserModel{
// email: string;
// emailConfirmationDate: string;
// firstName: string;
// id: string;
// isActive: boolean;
// isEmailConfirmed: boolean;
// lastName: string;
// phoneNumber: string;
// }

// interface RegistrationModel {
//   country:string;
//   businessName:string;
//   contactEmail: string;
//   contactPhoneNumber: string;
//   contactFirstName: string;
//   contactLastName: string;
//   industryCategoryId: number;
// }
export interface LoginModel {
  username: string;
  password: string;
}

const routes = {
  login: environment.baseUrl+'/Account/Login',
  recoverpassword: environment.baseUrl+'/Account/RecoverPasword',
  resetpassword: environment.baseUrl+'/Account/ResetPassword',
  changePassword: environment.baseUrl+'/Account/ChangePassword',
  changtoken: environment.baseUrl+'/Account/ChangeToken',
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseService<any> {
  private _credentials!: Credentials | null;
  private _saveToken: any;

  user = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) {
    super(http);
    const savedCredentials =
    sessionStorage.getItem(credentialsKey) ||
    localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
 * Authenticates the user.
 * @param context The login parameters.
 * @return The user credentials.
 */
  onLoggedin(context: Credentials): Observable<Credentials> {
    this.setCredentials(context);
    return of(context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
  */
  logout() {
  // Customize credentials invalidation here
  this.setCredentials();
  sessionStorage.removeItem('userpermission');
  //sessionStorage.removeItem('superMerchantID');
  

  this.router.navigate(['/']);

  location.reload();
}

 /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get token(): any {
    if (this._credentials) {
      this._saveToken = this._credentials.accessToken;
    } else {
      this._saveToken = null;
    }
    return this._saveToken;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
   get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get userDetail(): any | null {
    if (this._credentials) {
      return this._credentials.user;
    }
  }

  /**
   * @return The user details or null if the user is not authenticated.
   */
  get userMerchants(): any | null {
    if (this._credentials) {
      return this._credentials.merchants;
    }
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
   get hasPermission(): any | null {
    return null;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  public setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  login(data: LoginModel): Observable<any> {
    return this.sendPost(`${routes.login}`, data);
  }

  recoverpassword(data: {username:string}): Observable<any> {
    return this.sendPost(`${routes.recoverpassword}?username=${data.username}`, data);
  }

  resetpassword(data: {username:string, newpassword:string, verificationcode:string, hashvalue:string}): Observable<any> {
    return this.sendPost(`${routes.resetpassword}?username=${data.username}
    ?newpassword=${data.newpassword}?verificationcode=${data.verificationcode}
    ?hashvalue=${data.hashvalue}`, data);
  }

  changepassword(data: {username:string, oldpassword: string, newpassword: string}): Observable<any> {
    return this.sendPost(`${routes.changePassword}?username=${data.username}
    ?oldpassword=${data.oldpassword}?newpassword=${data.newpassword}`, data);
  }

  changtoken(data: {username:string, oldtransactioncode: string, newtransactioncode: string, hashvalue:string}): Observable<any> {
    return this.sendPost(`${routes.changtoken}?username=${data.username}
    ?oldtransactioncode=${data.oldtransactioncode}?newtransactioncode=${data.newtransactioncode}
    ?hashvalue=${data.hashvalue}`, data);
  }

  getCountryJson() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', 'assets/data/country.json');
      req.onload = () => {
        resolve(JSON.parse(req.response));
      };

      req.send();
    });
  }
}
