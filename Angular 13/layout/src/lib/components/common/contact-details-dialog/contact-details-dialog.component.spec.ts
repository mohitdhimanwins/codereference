import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ContactDetailsDialogComponent } from './contact-details-dialog.component';
import { MockDialogService } from '@shared/services';

describe('ContactDetailsDialogComponent', () => {
  let component: ContactDetailsDialogComponent;
  let fixture: ComponentFixture<ContactDetailsDialogComponent>;
  let dialogRef: MatDialogRef<ContactDetailsDialogComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDetailsDialogComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: MockDialogService  },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on calling close method', () => {
    const mockDialogRef = jest.spyOn(dialogRef, 'close');
    component.close();
    expect(mockDialogRef).toHaveBeenCalledWith(false);
  });
});
