import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceFormComponent } from './insurance-form.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsuranceInfo } from '@entities';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServicesModule } from '@shared/services';
import { AngularTestingRootModule, StoreTestingRootModule } from '@shared/testing';

describe('InsuranceFormComponent', () => {
  let component: InsuranceFormComponent;
  let fixture: ComponentFixture<InsuranceFormComponent>;
  const insuranceInfo: InsuranceInfo = {
    type: 'A',
    company: 'B',
    policyNo: 'C',
    startDate: '2023-06-15T00:00:00',
    endDate: '2023-06-18T00:00:00',
    deductibleAmount: 'F',
    agentName: 'G',
    agentPhone: 'H',
    importSource: 'I',
    importId: 'L',
    isDirty: false,
    isValid: false
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuranceFormComponent],
      imports: [AngularTestingRootModule, StoreTestingRootModule, TranslateModule.forRoot({}), ServicesModule, FormsModule, FlexLayoutModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceFormComponent);
    component = fixture.componentInstance;
    component.insuranceInfo = insuranceInfo;
    jest.spyOn(component, 'isFormDirty').mockReturnValue(false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bulidPrefix method is called', () => {
    const bulidPrefix = component.prefix + 1;
    const SpyMockBuildPrefix = jest.spyOn(component, 'bulidPrefix');
    component.bulidPrefix(bulidPrefix);
    expect(SpyMockBuildPrefix).toHaveBeenCalledWith(bulidPrefix);
  });

  it('should return changeStartDate', () => {
    component.changeStartDate();
    const date = new Date(insuranceInfo.startDate);
    expect(component.minDate).toStrictEqual(date);
  });

  describe('isDirty', () => {
    it('should check isFormDirty', () => {
      component.isFormDirty();
      expect(component.form.dirty).toBe(false);
    });
  });

  it('should check formValuesChanged method', () => {
    const mockEventMethod = jest.spyOn(component.valuesChanged, 'emit');
    component.formValuesChanged();
    expect(mockEventMethod).toHaveBeenCalled();
  });

});
