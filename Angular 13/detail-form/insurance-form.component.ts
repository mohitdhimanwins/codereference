import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseFormComponent } from '@base';
import { ConfigItemType, InsuranceInfo } from '@entities';
import { EventService, RxjsService } from '@shared/services';
import { DatepickerComponent } from '@shared/ui';
@Component({
  selector: 'common-insurance-form',
  templateUrl: './insurance-form.component.html',
})
export class InsuranceFormComponent extends BaseFormComponent implements AfterViewInit {
  @ViewChild('endDate') public endDate: DatepickerComponent;

  @ViewChild('form', { static: false }) public form: NgForm;
  @Input() insuranceInfo: InsuranceInfo = new InsuranceInfo();
  customerInsuranceType = ConfigItemType.CustomerInsuranceType;
  @Input() isRequired = false;
  prefix: any;
  submitted = false;
  @Output() valuesChanged = new EventEmitter<InsuranceInfo>();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  errorMsg = 'common.validations.invalidInsuranceStartDate';
  enabled = true;
  @Input() disableControl = false;
  constructor(public override eventService: EventService, public override rxjsService: RxjsService, private cdr: ChangeDetectorRef) {
    super(eventService, rxjsService);
  }
  bulidPrefix(num: number) {
    return Number(`${this.prefix}${num}`);
  }

  public override formValuesChanged(): void {
    this.valuesChanged.emit(this.insuranceInfo);
  }
  ngAfterViewInit(): void {
    this.registerFormValueChange(0);
  }

  changeStartDate() {
    this.minDate = new Date(this.insuranceInfo.startDate);
  }

  minMaxValidation() {
    const startDate = new Date(this.insuranceInfo.startDate);
    const currentDate = new Date();
    const isPastDate = startDate.getTime() < currentDate.getTime();

    if (isPastDate) {
      this.errorMsg = 'common.validations.invalidInsuranceStartDate';
      this.minDate = currentDate;
      this.endDate.min = currentDate;
    } else {
      this.errorMsg = 'common.validations.invalidEndDateRange';
      this.minDate = startDate;
      this.endDate.min = startDate;
    }

    this.submitted = true;
    this.enabled = false;
    this.cdr.detectChanges();
    this.enabled = true;
  }

  override isFormDirty() {
    return this.form.dirty;
  }
}
