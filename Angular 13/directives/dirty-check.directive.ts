import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { ModalService, StorageService } from '@shared/services';
import { DirtyConfirmationDialogComponent } from '@shared/ui';
import { StorageKeys } from '@shared/utils';

@Directive({
  selector: '[isDirtyInvalidForm]'
})
export class DirtyCheckDirective {
  @Output() clicked = new EventEmitter();

  constructor(
    private modalService: ModalService,
    private storageService: StorageService,
  ) { 
  }

  @HostListener('click', ['$event'])
  handleClick(e: Event) {
    const dirty = this.storageService.get(StorageKeys.FormDirty, true);
    if (dirty?.toUpperCase() == 'TRUE') {
      this.openDirtyConfirmationDialog(e, dirty);
    } else {
      this.clicked.next(e);
    }
  }

  openDirtyConfirmationDialog(e: Event, dirty: string) {
    const dialogRef = this.modalService.open(DirtyConfirmationDialogComponent, dirty, 'modal-sm');
    dialogRef.afterClosed().subscribe(async (response) => {
      if (response) {
        this.storageService.remove(StorageKeys.FormDirty, true);
        this.clicked.next(e);
      }
    });    
  }

}
