import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CaptureCreditAppDialogData, DealCreateType } from '@entities';
import { PaymentCalculatorDialogComponent } from '@features/deals/deal-shared';
import { CaptureCreditAppDialogComponent } from '@shared/components';
import { MockDialogService, ModalService } from '@shared/services';
import { MockRouterService } from '@shared/testing';
import { MockPermissionService, PermissionService } from '@store/user';
import { QuickActionsComponent } from './quick-actions.component';
describe('QuickActionsComponent', () => {
  let component: QuickActionsComponent;
  let fixture: ComponentFixture<QuickActionsComponent>;
  let modalService: ModalService;
  let permissionService: PermissionService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, TranslateModule.forRoot()],
      declarations: [QuickActionsComponent],
      providers: [
        { provide: Router, useValue: MockRouterService },
        { provide: ModalService, useValue: MockDialogService },
        { provide: PermissionService, useValue: MockPermissionService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    permissionService = TestBed.inject(PermissionService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(permissionService).toBeTruthy();
  });

  it('should check open is called', () => {
    component.open();
    expect(component.isOpened).toBe(true);
  });

  it('should check close is called', () => {
    component.close();
    expect(component.isOpened).toBe(false);
  });

  it('should navigate to "dms-import" when createDmsDeal is called', () => {
    const mockRouteNavigate = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    component.createDmsDeal();
    expect(mockRouteNavigate).toHaveBeenCalledWith(['/dms-import']);
  });
  it('should navigate to "home" with query params when createManualDeal is called', () => {
    const mockRouteNavigate = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    component.createManualDeal();
    expect(mockRouteNavigate).toHaveBeenCalledWith(['/deals/new'], { queryParams: { newDeal: DealCreateType.ManualInput } });
  });
  it('should open the capture app dialog', () => {
    const modalSpy = jest.spyOn(modalService, 'open').mockReturnValue(null);
    const data: CaptureCreditAppDialogData = {
      title: 'creditApp.linkSendTitle',
      dealId: null,
      hideTabs: false,
      button: {
        primaryButton: 'common.cancel',
        secondaryButton: 'common.sendLink',
      },
    };
    component.captureAppDialog();
    expect(modalSpy).toHaveBeenCalledWith(CaptureCreditAppDialogComponent, data, 'modal-md');
  });
  it('should open the payment calculator dialog', () => {
    const modalSpy = jest.spyOn(modalService, 'open').mockReturnValue(null);

    component.paymentCalculateDialog();
    expect(modalSpy).toHaveBeenCalledWith(PaymentCalculatorDialogComponent, null, 'modal-lg');
  });
  it('should return false if roleDetailComponent are not dirty', () => {
    const isDirty = component.hasUpdateDealPermission;
    expect(isDirty).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
