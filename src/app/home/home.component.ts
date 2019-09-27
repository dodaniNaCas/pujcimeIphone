import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { Mobile, getMobileInstances } from '../shared/models/mobile-mocks';
declare function homeTyped(): Function;
declare function openModalDetail(numberDay): Function;
declare function closeModalDetail(): Function;
declare function showSliderValue(priceOne, priceTwo, priceThree, priceFour,input): Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router: Router,
    private cd: ChangeDetectorRef,
    private sharedService: SharedService) { }

  selectedMobile: Mobile = null;
  mobilesAvailable: Array<Mobile> = [];

  ngOnInit() {
    //this.mobilesAvailable = getMobileInstances();
    this.sharedService.$getAllPhones().subscribe((res)=>{
      console.log(res);
      this.mobilesAvailable = res;
    },(e)=>{
      console.log(e);
    });
    this.cd.markForCheck();
    this.selectedMobile = this.sharedService.mobile;

    this.cd.markForCheck();
    console.log(this.sharedService.mobile);
  }

  ngAfterViewInit() {
    if (this.sharedService.mobile) {
      document.getElementById('poducts').scrollIntoView();
      this.selectedIphone(this.sharedService.mobile.id);
    }
    setTimeout(() => {
      homeTyped();
    }, 1500);
  }

  isSafari(): boolean {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        return false;
      } else {
        return true;
      }
    }

  }

  showSliderValue(input) {
    showSliderValue(this.selectedMobile.priceOne, this.selectedMobile.priceTwo,
      this.selectedMobile.priceThree, this.selectedMobile.priceFour,input);
  }

  selectedIphone(id) {
    
    console.log(id);
    this.sharedService.$getPhoneById(id).subscribe((res :Mobile)=>{
      this.sharedService.mobile = res;
      this.selectedMobile = res;
      this.cd.markForCheck();
      setTimeout(() => {
        openModalDetail(this.sharedService.mobile.priceOne);
      }, 300);
    }, (e)=>{
      console.log(e);
    });
    //KOMUNIKACE S API NEJLEPE ENDPOINT S GET NA KONKRETNI ITEM
   // this.sharedService.mobile = this.mobilesAvailable[id - 1];
   // this.selectedMobile = this.mobilesAvailable[id - 1];
   
  }

  ngOnDestroy() {
    closeModalDetail();
  }

}
