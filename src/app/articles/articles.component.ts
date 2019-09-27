import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:Article[] = [{id:1,title:"toto je prvni",content:"toto je obsah pro 1"},
  {id:2,title:"toto je druhou",content:"toto je obsah pro 2"},
  {id:3,title:"toto je treti",content:"toto je obsah pro 3"}];

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

  ngOnInit() {
  }

}
