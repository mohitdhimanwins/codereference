import { Component } from '@angular/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  isNotificationPanelOpened = false;
  toggle() {
    this.isNotificationPanelOpened = !this.isNotificationPanelOpened;
  }
}
