import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { notBlankValidator } from '../../shared/validation/validation.validators';
import { Mobile, getMobileInstances } from '../../shared/models/mobile-mocks';
import { SharedService } from '../../shared/shared.service';
import { LoginModel } from '../../shared/models/login.model';
declare function showLoginModal(): Function;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private sharedService: SharedService,
    private cd: ChangeDetectorRef) { }
  mobilesAvailable: Mobile[] = [];
  token: string;
  isLogged: boolean = false;
  ngOnInit() {
    this.sharedService.$getAllPhones().subscribe((res) => {
      this.mobilesAvailable = res;
      this.cd.markForCheck();
    }, (e) => {
        console.log(e);
      })
  }

  deleteItem(id) {
    this.sharedService.$deletePhone(id, this.token).subscribe(
      (res) => {
        this.mobilesAvailable.forEach((item) => { if (item.id === id) this.mobilesAvailable.splice(this.mobilesAvailable.indexOf(item), 1); });
        this.cd.markForCheck();
        console.log(res);
      }, (e) => {
        console.log(e);
      });
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
  }

  ngAfterViewInit() {
    window.scroll(0, 0);

    document.getElementById("mainNav").classList.remove("navbar-trans");
    document.getElementById("mainNav").classList.add("navbar-reduce");
    showLoginModal();
  }

  login(username,password) {
    let model: LoginModel = {
      username: username,
      password: password
    }
    this.sharedService.$login(model).subscribe((res) => {
      console.log(res);
    },
      (e) => {
        console.log(e);
        if (e.status === 200) {
          this.token = e.error.text;
          this.isLogged = true;
          this.cd.markForCheck();
        }
        else {
          showLoginModal();
        }
      });
  }

  updateItem(id, name, imgName, capacity, color, priceOne, priceTwo, priceThree, priceFour, deposit) {

    let itemToUpdate: Mobile = {
      id: id,
      name: name,
      imgName: imgName,
      capacity: capacity,
      color: color,
      priceOne: parseInt(priceOne),
      priceTwo: parseInt(priceTwo),
      priceThree: parseInt(priceThree),
      priceFour: parseInt(priceFour),
      deposit: parseInt(deposit)
    };

    this.sharedService.$updateMobile(itemToUpdate, this.token).subscribe((res) => {
      console.log(res);
    }, (e) => {
      console.log(e);
    });
  }

  submit(name, imgName, capacity, color, priceOne, priceTwo, priceThree, priceFour, deposit) {
    let newMobile: Mobile = { name: name, imgName: imgName, capacity: capacity, color: color, priceOne: parseInt(priceOne), priceTwo: parseInt(priceTwo), priceThree: parseInt(priceThree), priceFour: parseInt(priceFour), deposit: parseInt(deposit) }
    this.sharedService.$addNewPhone(newMobile, this.token).subscribe((res) => {
      this.sharedService.$getAllPhones().subscribe((res) => {
        this.mobilesAvailable = res;
        this.cd.markForCheck();
      }, (e) => {
        console.log(e);
      });
      console.log(res);
    }, (e) => {
      console.log(e);
    });
  }

}
