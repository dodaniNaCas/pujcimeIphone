import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormOrderModel } from '../../shared/models/form-order.mode';
import { notBlankValidator } from '../../shared/validation/validation.validators';
import { SharedService, interpolate } from '../../shared/shared.service';
import { Mobile, getMobileInstances } from '../../shared/models/mobile-mocks';
import { Email } from '../../shared/models/email.model';
import { EnvironmentConfig } from '../../shared/environment.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare function showSumaModal();
declare function showEModal();
declare function loadDatepickers();
declare function toggleModal(id, ids): Function;

@Component({
  selector: 'app-poptavka-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder
    , private cd: ChangeDetectorRef,
    private sharedService: SharedService,
    private http: HttpClient) { }

  wantFullPackage: boolean = false;
  isFO: boolean = false;
  ICOnotBlank = false;
  validationE = false;
  alreadySubmitted: boolean = false;
  form: FormGroup;
  submitModel: FormOrderModel = {};
  approve: boolean = false;
  eLocationOne: boolean = false;
  eLocationThree: boolean = false;
  eLocationTwo: boolean = false;
  emailValidationE: boolean = true;
  mobileOptions: Mobile[] = [];
  typeOfPhone: string = "";
  approveCheckbox: HTMLInputElement;
  wantFullPackageCheckbox: HTMLInputElement;

  ngAfterViewInit() {
    loadDatepickers();
    this.approveCheckbox = document.getElementById("approve") as HTMLInputElement;
    this.wantFullPackageCheckbox = document.getElementById("form-fullPackage") as HTMLInputElement;
  }

  ngAfterViewChecked() {
    if (this.alreadySubmitted) {
      this.findErrorLocation();
    }

  }

  //notificationFrequencyList() { return Object.keys(NotificationFrequency); }

  ngOnInit() {
    console.log(this.sharedService.mobile);
    this.buildForm();
    this.sharedService.$getAllPhones().subscribe((res: Mobile[]) => {
      res.forEach((item) => {
        this.mobileOptions.push({ id: item.id, name: item.name + ' ' + item.capacity + ' ' + item.color });
      });
    }, (e) => {
      console.log(e);
    });

    if (this.sharedService.mobile) {
      this.form.get('typeOfPhone').setValue(this.sharedService.mobile.id);
      this.getTypeOfPhone(this.sharedService.mobile.id);
    }

    this.cd.markForCheck();
  }

  emailValidation(value: string) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(value)) {
      this.emailValidationE = true;
    } else {
      this.emailValidationE = false;
    }
    this.cd.markForCheck();
  }

  buildForm() {
    this.form = this.fb.group({
      typeOfPhone: [this.submitModel.typeOfPhone, notBlankValidator],
      fullPackage: [this.submitModel.fullPackage],
      reasonOfRent: [this.submitModel.reasonOfRent, notBlankValidator],
      typeOfDelivery: [this.submitModel.typeOfDelivery, notBlankValidator],
      dateOfRent: [this.submitModel.dateOfRent, notBlankValidator],
      dateOfReturn: [this.submitModel.dateOfReturn],
      ico: [this.submitModel.ico],
      surname: [this.submitModel.surname, notBlankValidator],
      name: [this.submitModel.name, notBlankValidator],
      street: [this.submitModel.street, notBlankValidator],
      cp: [this.submitModel.cp, notBlankValidator],
      city: [this.submitModel.city, notBlankValidator],
      psc: [this.submitModel.psc, notBlankValidator],
      phone: [this.submitModel.phone, notBlankValidator],
      email: [this.submitModel.email, notBlankValidator],
      note: [this.submitModel.note]
    }

    );
  }

  approveChange() {
    if (this.approve)
      this.approve = false;
    else
      this.approve = true;

    this.cd.markForCheck();
  }

  typeOfCustomer($event) {

    if ($event.target.id !== "FO") {

      this.isFO = false;
    }
    else {

      this.isFO = true;
    }
    this.isICOnotBlank();
  }

  getFullPackage() {
    if (this.wantFullPackage)
      this.wantFullPackage = false;
    else
      this.wantFullPackage = true;

    this.cd.markForCheck();
  }

  changePhoneChoice() {
    this.getTypeOfPhone(this.form.get('typeOfPhone').value);
  }

  isICOnotBlank() {
    if (this.alreadySubmitted && this.isFO && (this.form.get('ico').value === null || this.form.get('ico').value.trim().length === 0)) {
      this.ICOnotBlank = true;
      this.cd.markForCheck();
    }
    else {
      this.ICOnotBlank = false;
      this.cd.markForCheck();
    }
  }

  getTypeOfPhone(id) {
    this.httpGet(interpolate(EnvironmentConfig.settings.env.uriPrefix + EnvironmentConfig.settings.env.getPhoneById, { phoneId: id })).subscribe((res: Mobile) => {
      this.typeOfPhone = res.name + ' ' + res.capacity + ' ' + res.color;
      this.cd.markForCheck();
    }, (e) => {
      console.log(e);
    });
  }

  findErrorLocation() {
    if (!this.form.get('typeOfPhone').valid || !this.form.get('fullPackage').valid || !this.form.get('reasonOfRent').valid) {
      this.eLocationOne = true;
    }
    else {
      this.eLocationOne = false;
    }
    if (!this.form.get('typeOfDelivery').valid || !this.form.get('dateOfRent').valid || !this.form.get('dateOfReturn').valid) {
      this.eLocationTwo = true;
    }
    else {
      this.eLocationTwo = false;
    }
    if (!this.form.get('email').valid || !this.form.get('phone').valid || !this.form.get('psc').valid
      || !this.form.get('street').valid || !this.form.get('cp').valid || !this.form.get('city').valid
      || !this.approve || (this.isFO && this.ICOnotBlank) || !this.form.get('name').valid || !this.form.get('surname').valid) {
      this.eLocationThree = true;
    }
    else {
      this.eLocationThree = false;

    }
    this.cd.markForCheck();

  }

  beforeSubmit() {
    console.log(this.form);
    this.alreadySubmitted = true;
    if (!this.form.valid || this.ICOnotBlank || !this.approve || this.emailValidationE) {
      this.validationE = true;
      this.cd.markForCheck();
      showEModal();
      this.findErrorLocation();
      return;
    }
    else {
      this.validationE = false;
      showSumaModal();
      this.cd.markForCheck();

    }
  }

  submit() {
    console.log(this.form);
    this.alreadySubmitted = true;
    if (this.form.valid && this.ICOnotBlank)
      return;

    let orderItem: FormOrderModel = {
      city: this.form.get('city').value,
      cp: this.form.get('cp').value,
      dateOfRent: this.form.get('dateOfRent').value,
      dateOfReturn: this.form.get('dateOfReturn').value ? this.form.get('dateOfReturn').value : 'Nevyplněno',
      email: this.form.get('email').value,
      fullPackage: this.wantFullPackage ? 'Ano' : 'Ne',
      ico: this.form.get('ico').value ? this.form.get('ico').value : 'Nevyplněno',
      name: this.form.get('name').value,
      note: this.form.get('note').value ? this.form.get('note').value : 'Nevyplněno',
      phone: this.form.get('phone').value,
      psc: this.form.get('psc').value,
      reasonOfRent: this.form.get('reasonOfRent').value,
      street: this.form.get('street').value,
      surname: this.form.get('surname').value,
      typeOfDelivery: this.form.get('typeOfDelivery').value,
      typeOfPhone: this.typeOfPhone


    };
    let bodyItem: Email = {
      body: orderItem,
      email: orderItem.email,
      subject: "Nová poptavka",
      name: orderItem.name
    }
    this.sharedService.$sendOrderEmail(bodyItem).subscribe((res) => {
      console.log(res);
      setTimeout(() => {
        toggleModal("orderModal", null);
        this.form.reset();
        this.alreadySubmitted = false;
        this.wantFullPackage = false;
        this.approve = false;
        this.approveCheckbox.checked = false;
        this.wantFullPackageCheckbox.checked = false;
        this.cd.markForCheck();
      }, 500);

      this.cd.markForCheck();
    },
      (e) => {
        console.log(e);
      });


  }

  dateChanged($event) {
    setTimeout(() => {
      this.form.get($event.target.name).setValue($event.target.value);
    }, 400);
  }

  private httpGet(url): Observable<any> {
    console.log("GET : " + url);
    return this.http.get(url, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  }

}
