import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:Article[];

  constructor(private sharedService: SharedService) { }

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
    this.articles = this.sharedService.$getArticle();
  }

}
