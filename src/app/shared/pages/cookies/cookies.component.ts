import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit, AfterViewInit {

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

}
