import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { PaginationConfig } from '../core/interfaces/pagination.interface';
import { NgForm } from '@angular/forms';
import { ControlInput } from '../core/classes/Control.class';

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
      // Fill Take and Skip
      pagination['take'] = paginator.pageSize;
      pagination['skip'] = paginator.pageIndex * paginator.pageSize;
    } else {
      // Start in first page with 10 items
      pagination['take'] = 10;
      pagination['skip'] = 0;
    }

    if (sort) {
      // Fill order (asc or desc) and OrderColumn (column name)
      pagination['order'] = sort.direction
        ? (sort.direction.toUpperCase() as 'ASC' | 'DESC')
        : 'ASC';
      pagination['orderColumn'] = sort.active ? sort.active : 'id';
    } else {
      // Order by id asc
      pagination['order'] = 'ASC';
      pagination['orderColumn'] = 'id';
    }

    if (filter) {
      pagination['filter'] = filter;
    } else {
      pagination['filter'] = '';
    }

    return pagination;
  }

  getErrorText(form: NgForm, control: ControlInput): string {
    if (!form || !form.control.get(control.config.name)) {
      return '';
    } else if (
      control.config.required &&
      form.control.get(control.config.name)!.hasError('required') &&
      control.config.errors.required
    ) {
      return control.config.errors.required;
    } else if (
      control.config.minlength &&
      form.control.get(control.config.name)!.hasError('minlength') &&
      control.config.errors.minlength
    ) {
      return control.config.errors.minlength;
    } else if (
      control.config.maxlength &&
      form.control.get(control.config.name)!.hasError('maxlength') &&
      control.config.errors.maxlength
    ) {
      return control.config.errors.maxlength;
    } else if (
      control.config.email &&
      form.control.get(control.config.name)!.hasError('email') &&
      control.config.errors.email
    ) {
      return control.config.errors.email;
    } else if (
      control.config.pattern &&
      form.control.get(control.config.name)!.hasError('pattern') &&
      control.config.errors.pattern
    ) {
      return control.config.errors.pattern;
    } else if (
      control.config.mask &&
      form.control.get(control.config.name)!.hasError('mask') &&
      control.config.errors.mask
    ) {
      return control.config.errors.mask;
    } else if (
      control.config.customValidators['cpfValidator'] &&
      form.control.get(control.config.name)!.hasError('invalidCpf') &&
      control.config.errors.invalidCpf
    ) {
      return control.config.errors.invalidCpf;
    } else if (
      control.config.customValidators['urlValidator'] &&
      form.control.get(control.config.name)!.hasError('invalidUrl') &&
      control.config.errors.invalidUrl
    ) {
      return control.config.errors.invalidUrl;
    } else {
      return '';
    }
  }
}
