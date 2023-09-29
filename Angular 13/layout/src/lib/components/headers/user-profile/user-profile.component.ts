import { Component, Input, OnDestroy, Output } from '@angular/core';
import { User } from '@entities';
import { MfaVerificationDialogComponent, SwitchLocationDialogComponent } from '@shared/components';
import { EventService, ModalService } from '@shared/services';
import { Subscription } from 'rxjs';
import { UpdateProfileDialogComponent } from './update-profile-dialog/update-profile-dialog.component';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnDestroy {
  @Input() user: User;
  @Input() isEnableMFA = false;
  @Input() isFormDirty = false;
  @Input() isFormValid = true;
  @Input() defaultLoaded = false;
  
  loaded = false;

  subscription = new Subscription();
  openQuickMenuAfterSave = false;
  
  constructor(private eventService: EventService, private modalService: ModalService) {
    this.subscription.add(
      this.eventService.backgroundCallCompletedObservable$.subscribe(() => {
        if (this.openQuickMenuAfterSave) {
          this.loaded = true;
          this.openQuickMenuAfterSave = false;
        }
      })
    );
  }

  clickQuickActions() {
    if (this.isFormDirty && this.isFormValid) {
      this.eventService.saveObservable.next();
      this.openQuickMenuAfterSave = true;
    } else {
      this.loaded = true;
    }
  }
  resetPassword() {
    this.eventService.resetPasswordObservable.next();
  }

  logoutUser() {
    this.eventService.logoutObservable.next(null);
  }

  changeLocation() {
    this.modalService.open(SwitchLocationDialogComponent, this.user, 'modal-sm');
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
