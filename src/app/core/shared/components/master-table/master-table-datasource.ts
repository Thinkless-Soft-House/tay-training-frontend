import { UtilsService } from '../../../../services/utils.service';
import { PaginationConfig } from '../../../interfaces/pagination.interface';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  firstValueFrom,
} from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

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

  hasErrorOnLoad = false;
  constructor(
    private service: Y,
    private filter$: Observable<string>,
    private utilsService: UtilsService,
    private loadingService: LoadingService,
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

          return this.getPagedData().pipe(
            catchError(() => {
              this.hasErrorOnLoad = true;
              return observableOf({
                items: [],
                total: 0,
              });
            })
          );
        }),
        tap((e: any) => {
          this.paginator!.length = e.count;
          // Transform atualPagination.take in paginator.pageIndex
          this.paginator!.pageIndex = Math.floor(
            this.atualPagination.skip! / this.atualPagination.take!
          );
          // Transform atualPagination.skip in paginator.pageSize
          this.paginator!.pageSize = this.atualPagination.take!;
        }),
        map((e: any) => {
          return {
            items: e.data,
            total: e.count,
          };
        }),
        map((e: any) => {
          this.loadingService.deactiveLoading();
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
    setTimeout(() => {
      this.loadingService.activeLoading();
      this.hasErrorOnLoad = false;
    }, 20);
    return this.filter$.pipe(
      switchMap((e) => {
        this.atualPagination = this.utilsService.createPaginationConfig(
          this.paginator!,
          this.sort!,
          e
        );

        const ret: Observable<T[]> = (this.service as any)[
          this.functionName || 'getByFilter'
        ](this.atualPagination);
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
