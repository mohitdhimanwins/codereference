import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
  USE_DEFAULT_LANG
} from '@ngx-translate/core';
import { ObjectPropertyByKeyPipe } from '@shared/pipes';
import { of } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { MatServerSideGridComponent } from './mat-server-side-grid.component';

describe('MatServerSideGridComponent', () => {
  let component: MatServerSideGridComponent;
  let fixture: ComponentFixture<MatServerSideGridComponent>;

  const dealsDetails = {
    items: [
      {
        dealId: 1,
        customerName: 'ABC',
        vehicle: 'AAA',
        amount: 1123,
        createdUtc: '2022-06-10T13:49:48.4952958',
        lastUpdatedUtc: '2022-06-10T13:49:48.4952958',
      },
      {
        dealId: 1,
        customerName: 'ABC',
        vehicle: 'AAA',
        amount: 1123,
        createdUtc: '2022-06-10T13:49:48.4952958',
        lastUpdatedUtc: '2022-06-10T13:49:48.4952958',
      },
    ],
    totalRecords: 100,
    page: 1,
    pageSize: 10,
    totalPages: 10,
    hasPrevious: true,
    hasNext: false,
  };

  const column = [
    {
      name: 'test',
      displayName: 'Name',
      sort: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatServerSideGridComponent, ObjectPropertyByKeyPipe],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: () => new TranslateFakeLoader(),
          },
        }),
      ],
      providers: [TranslateService, { provide: USE_DEFAULT_LANG, useValue: 'en' }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatServerSideGridComponent);
    component = fixture.componentInstance;
    component.data$ = of(dealsDetails);
    component.columns = column;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the displayedColumns when the columns input is set', () => {
    component.columns = [{ name: 'id', displayName: 'ID', sort: true }];
    component.ngOnInit();
    expect(component.displayedColumns).toEqual(['id']);
  });

  describe('should scroll down method', () => {
    it('should loadMore has false', () => {
      const spyMockEvent = jest.spyOn(component.onScroll, 'emit');
      const data = {
        position: jest.fn().mockReturnValue(1),
      };

      const componentRef: any = {
        directiveRef: data,
      };

      component.componentRef = componentRef;
      expect(component.loadMore).toBe(false);
      component.onScrollDown(null);
      expect(component.loadMore).toBe(true);
      expect(spyMockEvent).toHaveBeenCalled();
    });
    it('should loadMore has true', () => {
      component.loadMore = true;
      component.onScrollDown(null);
      expect(component.loadMore).toBe(true);
    });
  });

  it('should handle sort data', () => {
    const spyMockEvent = jest.spyOn(component.onSort, 'emit');
    component.sortData('');
    expect(spyMockEvent).toHaveBeenCalled();
    expect(spyMockEvent).toHaveBeenCalledWith('');
  });

  it('should handle row click method', () => {
    const spyMockEvent = jest.spyOn(component.triggerRowEvent, 'emit');
    component.rowEventEnabled = true;
    component.rowClick('');
    expect(spyMockEvent).toHaveBeenCalled();
    expect(spyMockEvent).toHaveBeenCalledWith('');
  });

  it('should handle toggle all checkbox method', () => {
    const spyMockEvent = jest.spyOn(component.checkAll, 'emit');
    const event = { checked: true };
    component.toggleAllCheckbox(event);
    expect(spyMockEvent).toHaveBeenCalled();
    expect(spyMockEvent).toHaveBeenCalledWith(event.checked);
  });

  it('should handle get property', () => {
    component.dataSource.data = [];
    expect(component.noDataFound).toEqual(true);
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

  it('sortData Method is called', () => {
    const payload = 3;
    jest.spyOn(component, 'sortData');
    component.sortData(payload);
    expect(component.sortData).toHaveBeenCalledWith(payload);
  });
});
