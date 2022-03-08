import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../core/base.service";

const routes = {
  industry: "/api/Industry",
  contry: "/api/Country",
};

@Injectable({
  providedIn: "root",
})
export class SharedService extends BaseService<any> {
  constructor(private http: HttpClient) {
    super(http);
  }

  onIndustry(): Observable<any> {
    return this.sendGet(`${routes.industry}`);
  }

  onCountry(): Observable<any> {
    return this.sendGet(`${routes.contry}`);
  }

 
}
