import { Component, OnInit, AfterViewInit, AfterViewChecked, HostListener } from '@angular/core';
declare function poptavkaTyped(): Function;

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

  ngAfterViewInit() {
    window.scroll(0, 0);

    //setTimeout(() => {
    //  poptavkaTyped();
    //}, 1000);
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");


  }

  ngAfterViewChecked() {
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }



}
