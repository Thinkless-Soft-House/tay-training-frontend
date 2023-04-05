import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { PaginationConfig } from '../core/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   * @description Create a PaginationConfig object with MatPaginator, MatSort and filter string. If doesn't have MatPaginator or MatSort, use default values.
   * @returns PaginationConfig
   * @param paginator MatPaginator
   * @param sort MatSort
   * @param filter string
   *
   */
  createPaginationConfig(
    paginator: MatPaginator,
    sort: MatSort,
    filter: string
  ): PaginationConfig {
    const pagination: any = {};

    if (paginator) {
      pagination['page'] = paginator.pageIndex + 1;
      pagination['pageSize'] = paginator.pageSize;
    } else {
      pagination['page'] = 1;
      pagination['pageSize'] = 10;
    }

    if (sort) {
      pagination['orderBy'] = sort.active;
      pagination['orderDirection'] = sort.direction;
    } else {
      pagination['orderBy'] = 'id';
      pagination['orderDirection'] = 'asc';
    }

    if (filter) {
      pagination['filter'] = filter;
    } else {
      pagination['filter'] = '';
    }

    return pagination;
  }
}
