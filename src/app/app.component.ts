import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SharedService } from './shared/shared.service';
declare function closeModalDetail(): Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'app';

  constructor(private translateService: TranslateService,
    private router: Router,
    private sharedService: SharedService) {

  }

  ngOnInit() {
    let routes = ["/","/poptavka",'/ochrana-osobnich-udaju','/cookies',"/add-new-toys",'/clanky'];
    routes.forEach((item) => {
      if(window.location.pathname === item){
        this.router.navigate[item];    
        console.log("ok, so redirecting to " + item);
        return;
      }
    });

    // if (window.location.pathname === "/poptavka") {
    //   this.router.navigate['/poptavka'];
    // }
    // else if (window.location.pathname === "/ochrana-osobnich-udaju") {
    //   this.router.navigate['/ochrana-osobnich-udaju'];
    // }
    // else if (window.location.pathname === "/cookies") {
    //   this.router.navigate['/cookies'];
    // }
    // else if (window.location.pathname === "/add-new-toys") {
    //   this.router.navigate['/add-new-toys'];
    // }
    // else if (window.location.pathname === "/") {
    //   this.router.navigate['/'];
    // }
    
    
    console.log(window.location);
    
    const lang = 'CZ';
    this.translateService.setDefaultLang(lang);
    return this.translateService.use(lang).toPromise();
  }
  ngAfterViewInit() {
    setTimeout(() => {
    window.scroll(0, 0);
    }, 700);
  }
  navigate(event:any,where: string) {
    this.router.navigateByUrl('/');
    let timing = 0;
    if (this.router.url === "/poptavka") {
      timing = 800;
    }
    
    console.log(this.router.url);
    this.sharedService.mobile = null;
    setTimeout(() => {
      closeModalDetail();
      document.getElementById(where).scrollIntoView();
      Array.prototype.forEach.call(document.getElementsByClassName('js-scroll'), function (element) {
        element.classList.remove("active");
      });
      event.target.classList.add("active"); 
    }, timing);
    
  }
}
