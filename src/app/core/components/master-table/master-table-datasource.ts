import { UtilsService } from './../../../services/utils.service';
import { PaginationConfig } from './../../interfaces/pagination.interface';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  firstValueFrom,
} from 'rxjs';

/**
 * Data source for the TableExample view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MasterTableDataSource<T, Y> extends DataSource<T> {
  data: T[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  atualPagination!: PaginationConfig;
  constructor(
    private service: Y,
    private filter$: Observable<string>,
    private utilsService: UtilsService,
    private functionName: string
  ) {
    super();
    this.atualPagination = this.utilsService.createPaginationConfig(
      this.paginator!,
      this.sort!,
      ''
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange,
        this.filter$
      ).pipe(
        switchMap((e) => {
          // Filter data
          console.log('change datasource', e);

          return this.getPagedData();
        }),
        tap((e: any) => {
          console.log('tap', e);
          this.paginator!.length = e.total;
          this.paginator!.pageIndex = this.atualPagination.page - 1;
          this.paginator!.pageSize = this.atualPagination.pageSize;
        }),
        map((e: any) => {
          console.log('map', e);
          return e.items;
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(): Observable<T[]> {
    return this.filter$.pipe(
      switchMap((e) => {
        this.atualPagination = this.utilsService.createPaginationConfig(
          this.paginator!,
          this.sort!,
          e
        );

        const ret: Observable<T[]> = (this.service as any)['getByFilter'](
          this.atualPagination
        );
        return ret;
      })
    );
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
