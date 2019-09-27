import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operator/switchMap';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cd: ChangeDetectorRef
  ) { }
 
  article:Article = {};

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
    let id = this.route.snapshot.paramMap.get('id');
    this.article = this.sharedService.$getArticle(id)[0];
    this.cd.markForCheck();
  }

}
