import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ModalService, StorageService } from '@shared/services';
import { DirtyConfirmationDialogComponent } from '@shared/ui';
import { DirtyCheckDirective } from './dirty-check.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreTestingRootModule } from '@shared/testing';
import { TranslateModule } from '@ngx-translate/core';
import { StorageKeys } from '@shared/utils';
import { of } from 'rxjs';

describe('DirtyCheckDirective', () => {
  let directive: DirtyCheckDirective;
  let modalService: ModalService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DirtyCheckDirective ],
      imports: [FormsModule,MatDialogModule,BrowserAnimationsModule,TranslateModule.forRoot(),],
      providers: [
        ModalService,
        StorageService,DirtyCheckDirective
      ]
    });
    
    directive = TestBed.inject(DirtyCheckDirective);
    modalService = TestBed.inject(ModalService);
    storageService = TestBed.inject(StorageService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call clicked event when form is not dirty', () => {
    const spy = jest.spyOn(directive.clicked, 'next');
    directive.handleClick(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should open dialog when form is dirty', () => {
    jest.spyOn(storageService, 'get').mockReturnValue('TRUE');
    const spy = jest.spyOn(modalService, 'open');
    directive.handleClick(new Event('click'));
    expect(spy).toHaveBeenCalledWith(DirtyConfirmationDialogComponent, 'TRUE', 'modal-sm');
  });

});
