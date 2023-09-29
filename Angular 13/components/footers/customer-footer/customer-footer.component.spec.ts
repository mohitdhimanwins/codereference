import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MockDialogService, ModalService } from '@shared/services';
import { CustomerFooterComponent } from './customer-footer.component';
import { UserOrgInfo } from '@entities';

describe('CustomerFooterComponent', () => {
  let component: CustomerFooterComponent;
  let fixture: ComponentFixture<CustomerFooterComponent>;
  let modalService: ModalService;

  const userOrgInfo: UserOrgInfo = {
    orgName: 'test',
    orgAddress: 'address',
    orgPhone: '1234567890',
    name: 'test',
    fullAddress: 'test',
    website: 'http://test.com',
    phone: '124567890',
    configs: [],
    lenders: 'test',
    privacyPolicy: 'test',
    termsOfUse: 'test',
    logo: 'odl_logo',
    showMenuProductCost: false,
    showMenuProductPayments: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFooterComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ModalService, useValue: MockDialogService
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFooterComponent);
    component = fixture.componentInstance;
    component.userOrgInfo = userOrgInfo;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open contact app dialog', () => {
    const mockServiceOpenDialog = jest.spyOn(modalService, 'open');
    component.openContactAppDialog();
    expect(mockServiceOpenDialog).toHaveBeenCalled();
  });
  
});
