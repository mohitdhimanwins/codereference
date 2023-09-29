import { Component, Input, OnDestroy } from '@angular/core';
import { User } from '@entities';
import { MfaVerificationDialogComponent } from '@shared/components';
import { EventService, ModalService } from '@shared/services';
import { Subscription } from 'rxjs';
import { UpdateProfileDialogComponent } from '../user-profile/update-profile-dialog/update-profile-dialog.component';

@Component({
  selector: 'admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.scss']
})
export class AdminUserProfileComponent implements OnDestroy {

  @Input() user: User;
  @Input() isEnableMFA = false;

  private subscription = new Subscription();
  constructor(private eventService: EventService, private modalService: ModalService) {}

  resetPassword() {
    this.eventService.resetPasswordObservable.next();
  }

  logoutUser() {
    this.eventService.logoutObservable.next(null);
  }

  dialogMFAProfile() {
    if (this.isEnableMFA && this.user.mobilePhone) {
      const dialogRef = this.modalService.open(MfaVerificationDialogComponent, this.user, 'modal-xs');

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.modalService.open(UpdateProfileDialogComponent, this.user, 'modal-md');
        }
      });
    } else {
      this.modalService.open(UpdateProfileDialogComponent, this.user, 'modal-md');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
