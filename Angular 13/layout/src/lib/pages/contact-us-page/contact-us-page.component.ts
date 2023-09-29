import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AppFacade } from '@store/app';
import { UserFacade } from '@store/user';

@Component({
  selector: 'contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss'],
})
export class ContactUsPageComponent {
  vm$ = this.userFacade.userOrgInfo$

  constructor(private location: Location, private userFacade: UserFacade) {}

  back() {
    this.location.back();
  }
}
