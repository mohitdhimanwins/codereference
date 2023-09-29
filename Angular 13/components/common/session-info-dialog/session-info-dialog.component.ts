import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserFacade } from '@store/user';

@Component({
  selector: 'session-info-dialog',
  templateUrl: './session-info-dialog.component.html',
  styleUrls: ['./session-info-dialog.component.scss'],
})
export class SessionInfoDialogComponent {
  copied = false;
  copiedSessionId: string;
  userVm$ = this.userFacade.userViewModel$;
  constructor(public dialogRef: MatDialogRef<SessionInfoDialogComponent>, public userFacade: UserFacade) {}

  copy(tooltip) {
    this.copied = true;
    tooltip.show();
    setTimeout(() => (this.copied = false), 1000);
  }

  close(value = null) {
    this.dialogRef.close(value);
  }
}
