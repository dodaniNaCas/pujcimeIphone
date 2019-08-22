import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Subject } from 'rxjs/Subject';
declare function toggleModal(id, ids): Function;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private sharedService: SharedService,
   private cd: ChangeDetectorRef) { }
  alreadySubmitted = false;
  emailValidationE = true;
  ngOnInit() {
  }

  sendEmail(name, email, body, subject) {
    this.alreadySubmitted = true;
    if (this.emailValidationE)
      return;

    let item: EmailContactForm = {
      subject: subject,
      name: name,
      email: email,
      body:body
    };
    this.sharedService.$sendContactForm(item).subscribe((res) => {
      console.log(res);
      toggleModal("contactFormModal",["contactSubject", "contactName", "contactEmail", "contactBody"]);
    }, (e) => {
        console.log(e);
    });

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

}

export interface EmailContactForm {
  name?: string,
  email?: string,
  subject?: string,
  body?: string
}
