import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  sendEmail(name,email,body,subject) {
    let item: EmailContactForm = {
      subject: subject,
      name: name,
      email: email,
      body:body
    };
    this.sharedService.$sendContactForm(item).subscribe((res) => {
      console.log(res);
    }, (e) => {
        console.log(e);
    });

  }

}

export interface EmailContactForm {
  name?: string,
  email?: string,
  subject?: string,
  body?: string
}
