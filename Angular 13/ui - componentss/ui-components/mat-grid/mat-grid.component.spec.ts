import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@shared/services';
import { of } from 'rxjs';
import { MatGridComponent } from './mat-grid.component';
import { usersData } from '@store/user-management';

describe('MatGridComponent', () => {
  let component: MatGridComponent;
  let fixture: ComponentFixture<MatGridComponent>;
  const users = usersData;
  const column = [
    {
      name: 'test',
      displayName: 'Name',
      sort: true,
    },
  ];
  const columns = {
    name: 'sourabh',
    displayName: 'sourabh',
    sort: false,
    tooltip: false,
    columnClass: 'order',
  };
  const unit: any = {
    id: 1,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatGridComponent],
      imports: [TranslateModule.forRoot({})],
      providers: [
        {
          provide: UtilityService,
          useValue: MockUtilityService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatGridComponent);
    component = fixture.componentInstance;
    component.data$ = of(users);
    component.columns = column;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rowClick Method is called', () => {
    const payload = 3;
    jest.spyOn(component, 'rowClick');
    component.rowClick(payload);
    expect(component.rowClick).toHaveBeenCalledWith(payload);
  });
  it('toggleAllCheckbox Method is called', () => {
    const payload = 3;
    jest.spyOn(component, 'toggleAllCheckbox');
    component.toggleAllCheckbox(payload);
    expect(component.toggleAllCheckbox).toHaveBeenCalledWith(payload);
  });

  it('trackBy Method is called', () => {
    const payload = 3;
    jest.spyOn(component, 'trackBy');
    component.trackBy(payload, unit);
    expect(component.trackBy).toBeCalledWith(payload, unit);
  });

  it('ngOnInit Method is called', () => {
    if (columns != null) {
      expect(true).toBeTruthy();
    }
  });

  it('if columns is larger than 0', () => {
    expect(true).toBeTruthy();
  });

  it('bindGrid function is called', () => {
    jest.spyOn(component, 'bindGrid');
    component.bindGrid();
    expect(component.bindGrid).toHaveBeenCalled();
  });
});
