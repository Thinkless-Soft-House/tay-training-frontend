import { LoadingService } from './../../../../services/loading.service';
import { MasterTableDataSource } from './master-table-datasource';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss'],
})
export class MasterTableComponent<T, Y> {
  @Input() columns: { name: string; title: string }[] = [];
  @Input() filterChange$: BehaviorSubject<string> = new BehaviorSubject('');
  filterChangeToDataSource$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() service!: Y;
  @Input() functionName: string = 'getAll';

  @Output() edit$: EventEmitter<T> = new EventEmitter();
  @Output() delete$: EventEmitter<T> = new EventEmitter();
  @Output() changeTable$: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<T>;

  dataSource!: MasterTableDataSource<T, Y>;
  itemColumns: { name: string; title: string }[] = [];
  displayedColumns: string[] = [];
  constructor(
    private utilsService: UtilsService,
    public loadingService: LoadingService
  ) {}

  private createColumns() {
    console.log(this.columns);
    this.itemColumns = JSON.parse(JSON.stringify(this.columns));

    this.columns.push({
      name: 'actions',
      title: 'Actions',
    });
    this.displayedColumns = this.columns.map((c) => c.name);
    console.log(this.displayedColumns);
  }

  ngOnInit() {
    this.createColumns();
    this.dataSource = new MasterTableDataSource(
      this.service,
      this.filterChangeToDataSource$.pipe(debounceTime(200)),
      this.utilsService,
      this.loadingService,
      this.functionName
    );
  }

  ngAfterViewInit(): void {
    this.filterChange$.pipe(debounceTime(500)).subscribe((value) => {
      this.filterChangeToDataSource$.next(value);
    });

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  edit(row: T) {
    this.edit$.emit(row);
  }

  delete(row: T) {
    this.delete$.emit(row);
  }
}
