import { Injectable } from '@angular/core';
import { Mobile, getMobileInstances } from './models/mobile-mocks';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EnvironmentConfig } from './environment.config';
import { LoginModel } from './models/login.model';

@Injectable()
export class SharedService {

  public mobile: Mobile;
  constructor(
    private http: HttpClient) { }

  public token: string = "";
  //setSelectedPhone(type, capacity, color, price){
  //  this.mobile = {capacity: capacity,color: color,type : type, price:price };
  //}

  $sendContactForm(item) {
    return this.httpPost(EnvironmentConfig.settings.env.uriPrefix + "email/ContactForm", item);
  }

  $addNewPhone(item,secret) {
    return this.httpPost(EnvironmentConfig.settings.env.uriPrefix + EnvironmentConfig.settings.env.getPhones,item,secret);
  }

  $deletePhone(id, secret) {
    return this.httpDelete(interpolate(EnvironmentConfig.settings.env.uriPrefix + "mobile/#{phoneId}", { phoneId: id }), secret);
  }

  $getAllPhones(){
    return this.httpGet(EnvironmentConfig.settings.env.uriPrefix + EnvironmentConfig.settings.env.getPhones);
  }

  $getPhoneById(id){
    return this.httpGet(interpolate(EnvironmentConfig.settings.env.uriPrefix + EnvironmentConfig.settings.env.getPhoneById, { phoneId: id }));
  }

  $sendOrderEmail(item) {
    return this.httpPost(EnvironmentConfig.settings.env.uriPrefix + "email/SendOrder", item);
  }

  $login(loginModel: LoginModel) {
    return this.httpPost(EnvironmentConfig.settings.env.uriPrefix + "auth/Login", loginModel);
  }

  $updateMobile(item: Mobile,secret) {
    return this.httpPut(EnvironmentConfig.settings.env.uriPrefix + "mobile", item, secret)
  }

  getTypeOfPhone(id): string {
    if (id) {
      this.httpGet(interpolate(EnvironmentConfig.settings.env.uriPrefix + EnvironmentConfig.settings.env.getPhoneById, { phoneId: id })).subscribe((res : Mobile) => {
        return res.name + ' ' + res.capacity + ' ' + res.color;
      }, (e) => {
          console.log(e);
        });
    }
    else {
      return null;
    }
  }

  private httpGet(url): Observable<any> {
    console.log("GET : " + url + "\n httpHeaders: " + JSON.stringify(this.getHttpHeaders()));
    return this.http.get(url, { headers: this.getHttpHeaders() });
  }

  private httpPost(url,item,secret?): Observable<any> {
    console.log("GET : " + url + "\n httpHeaders: " + JSON.stringify(this.getHttpHeaders()));
    return this.http.post(url, item,{ headers: this.getHttpHeaders(secret) });
  }

  private httpDelete(url, secret): Observable<any> {
    console.log("GET : " + url + "\n httpHeaders: " + JSON.stringify(this.getHttpHeaders()));
    return this.http.delete(url,{ headers: this.getHttpHeaders(secret) });
  }

  private httpPut(url, item, secret): Observable<any> {
    console.log("GET : " + url + "\n httpHeaders: " + JSON.stringify(this.getHttpHeaders()));
    return this.http.put(url, item, { headers: this.getHttpHeaders(secret) });
  }

  getHttpHeaders(accessToken?: string) {
    return { 'Content-Type': 'application/json; charset=utf-8', 'accessToken': accessToken ? accessToken : "test" };
  }

}

export function interpolate(template: string, values: Object) {
  return template.replace(/#{([\w0-9]+)}/g, (val, match) => {
    return isEmpty(values[match]) ? val : values[match];
  });
}

export function isDefined(arg: any): boolean {
  return arg !== null && typeof arg !== 'undefined';
}

export function isNotDefined(arg: any): boolean {
  return !isDefined(arg);
}

export function isEmpty(val: string | number | boolean) {
  return isNotDefined(val) || (typeof val === 'string' && val.length === 0);
}
