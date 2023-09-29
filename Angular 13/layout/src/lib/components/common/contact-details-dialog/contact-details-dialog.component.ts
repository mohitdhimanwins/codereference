import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserOrgInfo } from '@entities';

@Component({
  selector: 'contact-details-dialog',
  templateUrl: './contact-details-dialog.component.html',
  styleUrls: ['./contact-details-dialog.component.scss'],
})
export class ContactDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userOrgInfo: UserOrgInfo,
    public translateService: TranslateService
  ) {}

  close() {
    this.dialogRef.close(false);
  }
}
