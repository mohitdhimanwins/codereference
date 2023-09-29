import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GridColumn, SortDirection } from '@entities';
import { ObjectPropertyByKeyPipe } from '@shared/pipes';
import { UtilityService } from '@shared/services';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mat-grid',
  templateUrl: './mat-grid.component.html',
  styleUrls: ['./mat-grid.component.scss'],
  providers: [ObjectPropertyByKeyPipe],
})
export class MatGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() loaded = false;
  @Input() data$: Observable<object[]>;
  @Input() sortColumn: string;
  @Input() sortDirection = SortDirection.Ascending;
  @Input() columns: Array<GridColumn>;
  @Input() isDashboard = false;

  @Input() allCheckboxChecked = false;
  @Input() disabledCheckbox = false;
  @Output() checkAll = new EventEmitter<boolean>();

  // Row Details Properties
  @Input() detailRow?: TemplateRef<HTMLElement>;
  @Input() isRowDisabled: (data: object) => boolean;
  @Input() hideDetailRow: (data: object) => boolean;

  @Input() rowEventEnabled = false;
  @Input() sumOfColumnNames: string[] = [];
  @Input() displayMessage = 'common.noRecord';
  @Output() triggerRowEvent = new EventEmitter();
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() sumOfColumHandler: (key: string, data: object[]) => number;

  displayedColumns: string[];
  dataSource = new MatTableDataSource([]);

  tableData: object[] = [];
  private subscription = new Subscription();

  constructor(private objectPropertyByKeyPipe: ObjectPropertyByKeyPipe, private utilityService: UtilityService) {}

  ngOnInit() {
    if (this.columns) {
      this.displayedColumns = this.columns.filter((p) => !p.hideColumn).map((col) => col.name);
    }
  }

  bindGrid() {
    this.subscription.add(
      this.data$.subscribe((data) => {
        this.tableData = data;
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.sortingDataAccessor = (data: object, sortHeaderId: string) => {
          if (sortHeaderId.includes('.')) {
            return this.objectPropertyByKeyPipe.transform(data, sortHeaderId);
          }
          return data[sortHeaderId];
        };
        this.dataSource.sort = this.sort;
      })
    );
  }

  togggleHiddenColumns(show: boolean) {
    if (!this.columns) return;

    this.columns.forEach((c) => {
      if (c.hideColumn !== undefined) c.hideColumn = !show;
      return c;
    });

    if (show) {
      this.displayedColumns = this.columns.map((col) => col.name);
    } else {
      this.displayedColumns = this.columns.filter((p) => !p.hideColumn).map((col) => col.name);
    }
  }

  trackBy(_index: number, unit) {
    return unit.id;
  }

  ngAfterViewInit(): void {
    this.bindGrid();
  }

  toggleAllCheckbox(event) {
    this.checkAll.emit(event.checked);
  }

  rowClick(rowData) {
    if (this.rowEventEnabled) this.triggerRowEvent.emit(rowData);
  }

  sumOfGridColumn(key: string) {
    const totalVal = this.sumOfColumHandler ? this.sumOfColumHandler(key, this.tableData) : this.tableData.map((t) => t[key]).reduce((acc, value) => acc + value, 0);
    return this.utilityService.formatAmount(totalVal);
  }

  get noDataFound() {
    return this.dataSource.data.length == 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
