import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserData } from '@entities';
import { PipesModule } from '@shared/pipes';
import { MockUtilityService, UtilityService } from '@shared/services';
import { MainHeaderComponent } from './main-header.component';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;
  const defaultValues = {
    isEnableMFA: true,
    isLoaded: true,
    isFormDirty: true,
    isFormValid: true,
  };

  const data = {
    isDmsEnabled: false,
    hasCredit700Enabled: false,
    creditDashoardUrl: '',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainHeaderComponent],
      imports: [PipesModule],
      providers: [{ provide: UtilityService, useValue: MockUtilityService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    component.user = UserData;
    component.clientData = { ...component.clientData, logo: 'logo.jpg' };
    component.defaultValues = defaultValues;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle event', () => {
    const event = { target: { src: '' } };
    component.onError(event);
    expect(event.target.src).toEqual('assets/core/images/client-logos/logo.jpg');
  });

  it('should check theme get property', () => {
    expect(component.themes.length).toBe(0);
  });
});
