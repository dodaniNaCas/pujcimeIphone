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

  articlesMockes: Article[] = [
    {
      id: 1,
      title: "Jak zálohovat data na iPhone",
      content: "<ol> <li>Ze všeho nejdříve se ujistěte, zda máte na svém telefonu zaplé WI-FI</li> <li>Přejděte do nastavení, kde vyberte vaše jméno (Apple ID) a klepněte na iCloud. Zde klepněte v dolní části obrazovky na možnost ZÁLOHOVAT, čímž začne zálohování vašich dat. POZOR! Po celou dobu zálohování musíte být připojení k WI-FI.</li> <img src=\"../../../assets/img/clanky/clanek1-1.jpg\"/> <li>Pokud chcete, aby zálohování probíhalo automaticky každý den, zapněte funkci iCloudu v horní části obrazovky. iPhone připojte k napájecímu zařízení a zapněte WIFI. Důležité je přitom mít dostatek volného místa na iCloudu. Ten vám při registraci dá zadarmo 5 GB, další místo je možné přikoupit, například 50 GB za 25 kč měsíčně.</li> <img src=\"../../../assets/img/clanky/clanek1-2.jpg\"/> </ol>",
      preview: "Bojíte se, že ztratíte data uložená ve svém iPhonu? Není nic jednoduššího, než se pojistit a pomocí iCloudu data zálohovat. Zde najdete stručný návod, jak na to!"
    },
    {
      id: 2,
      title: "Jak smazat data na iPhone",
      content: "<ol> <li> Předně se ujistěte, zda máte data zálohovaná (jak zálohovat data si přečtěte zde - odkaz na předešlej článek o záloze) </li> <li>Pro smazání dat přejděte přes NASTAVENÍ do OBECNÉ. Klepněte na OBNOVIT. <br/> V této záložce na vás vyskočí několik možností. Vyberete možnost SMAZAT DATA A NASTAVENÍ. Po této možnosti budete muset zadat svůj KÓD, anebo APPLE ID - potvrďte.</li> <img alt=\"SMAZAT DATA A NASTAVENÍ\" src=\"../../../assets/img/clanky/clanek2-1.jpg\"> <li>Nezbývá než počkat, až se data z vašeho zařížení vymažou. Po několika minutách(v závislosti na počtu dat ve vašem zařízení) bude váš iPhone čistý jako když jste ho poprvé rozbalili z krabičky.</li> </ol>",
      preview:"Potřebujete kompletně vymazat váš iPhone? Ukážeme vám jak na to!"
    },
    {
      id: 3,
      title: "Jak najít iPhone",
      content: "<p> V každém iPhonu existuje funkce NAJÍT iPHONE. Pokud ji nemáte zaplou, radíme nahlásit ztrátu zařízení. Pokud ji zaplou máte, můžete snadno zjistit, kde se váš telefon momentálně nachází.</p> <h3>NĚKOLIK MOŽNOSTÍ</h3> <p>Přihlašte se z počítače na web www.icloud.com/find Použijte funkci NAJÍT iPhone v jiném iPhonu, iPodu touch nebo iPadu.</p> <ol> <li> Ve funkci NAJÍT iPhone vyhledejte váš iPhone. Poté ho vyhledejte na mapě. V případě, že se nachází nedaleko vás, je možné na něm přehrát zvuk, který usnadní vám nebo někomu z vašeho okolí telefon lokalizovat. </li> <li>Pokud si myslíte, že je iPhone v cizích rukách, nebo ho někdo našel, můžete na dálku zapnout REŽIM ZTRÁTY. V tomto případě se na uzamčené obrazovce objeví zpráva o ztracení a vaše telefonní číslo.</li> </ol>",
      preview:"Ukradl vám někdo telefon? Měli jste dlouhou noc, po které jste nemohli najít svůj iPhone? Třeba vám vypadl na cestě domů mezi sedačky taxi a vy byste potřebovali zjistit jeho polohu? Ukážeme vám jak na to!"
    }
  ]

  $getArticle(id?){
    return id ? this.articlesMockes.filter((item)=>{ if (item.id === parseInt(id)) return item}) : this.articlesMockes;
  }

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
