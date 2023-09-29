import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { NormalCasePipe } from '@shared/pipes';
import { EventService, MockDialogService, MockEventService, ModalService } from '@shared/services';
import { UserFacade } from '@store/user';
import { AdminUserProfileComponent } from './admin-user-profile.component';

describe('AdminUserProfileComponent', () => {
  let component: AdminUserProfileComponent;
  let fixture: ComponentFixture<AdminUserProfileComponent>;
  let eventService: EventService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserProfileComponent, NormalCasePipe],
      imports: [MatMenuModule, TranslateModule.forRoot()],
      providers: [
        UserFacade,
        {
          provide: EventService,
          useValue: MockEventService,
        },
        {
          provide: ModalService,
          useValue: MockDialogService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    eventService = TestBed.inject(EventService);
    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should logoutUser method', () => {
    const mockLogoutObservable = jest.spyOn(eventService.logoutObservable, 'next');
    component.logoutUser();
    expect(mockLogoutObservable).toHaveBeenCalled();
  });
  it('should resetPassword method', () => {
    const mockLogoutObservable = jest.spyOn(eventService.resetPasswordObservable, 'next');
    component.resetPassword();
    expect(mockLogoutObservable).toHaveBeenCalled();
  });
  it('should printCreditapp method', () => {
    const openSpy = jest.spyOn(modalService, 'open');
    component.dialogMFAProfile();
    expect(openSpy).toHaveBeenCalled();
  });
});
