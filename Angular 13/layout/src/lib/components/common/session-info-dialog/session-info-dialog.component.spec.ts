import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MockUserFacade, UserFacade } from '@store/user';
import { SessionInfoDialogComponent } from './session-info-dialog.component';
import { MockDialogService } from '@shared/services';

describe('SessionInfoDialogComponent', () => {
  let component: SessionInfoDialogComponent;
  let fixture: ComponentFixture<SessionInfoDialogComponent>;
  let matDialogRef: MatDialogRef<SessionInfoDialogComponent>;
  let userFacade: UserFacade;
  beforeEach(async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    await TestBed.configureTestingModule({
      declarations: [SessionInfoDialogComponent],
      imports: [TranslateModule.forRoot(), MatTooltipModule],
      providers: [
        { provide: MatDialogRef, useValue: MockDialogService },
        { provide: UserFacade, useValue: MockUserFacade },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userFacade = TestBed.inject(UserFacade);
    matDialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(userFacade).toBeTruthy();
  });

  it('should check copy method', () => {
    const event = { show: jest.fn() };
    component.copy(event);
    expect(component.copied).toBe(true);
    jest.advanceTimersByTime(1000);
    expect(component.copied).toBe(false);
  });

  it('should check close method', () => {
    const mockDialogClose = jest.spyOn(matDialogRef, 'close');
    component.close();
    expect(mockDialogClose).toHaveBeenCalled();
  });
});
