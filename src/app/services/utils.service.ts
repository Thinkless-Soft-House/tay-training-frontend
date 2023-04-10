import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { PaginationConfig } from '../core/interfaces/pagination.interface';
import { NgForm } from '@angular/forms';
import { ControlInput } from '../core/classes/control.class';

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
