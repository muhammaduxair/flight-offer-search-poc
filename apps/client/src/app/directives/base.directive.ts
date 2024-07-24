import {
  AfterViewInit,
  Directive,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ApiHelperService } from '../services';
import { IApiResponse } from '../interface';

@Directive()
export class BaseDirective
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  readonly apiHelperService: ApiHelperService;

  // variables
  constructor(private injector: Injector) {
    this.apiHelperService = this.injector.get(ApiHelperService);
  }

  // lifecycle hooks start here
  ngOnInit(): Promise<void> | void {
    Promise.resolve();
  }

  ngOnDestroy(): Promise<void> | void {
    Promise.resolve();
  }

  ngAfterViewInit(): Promise<void> | void {
    Promise.resolve();
  }

  ngOnChanges(changes: SimpleChanges): void {
    Promise.resolve(changes);
  }
  // lifecycle hooks end here

  // http methods start here
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    return this.apiHelperService.get<T>(
      `http://localhost:1338/api/${endpoint}`,
      params
    );
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    return this.apiHelperService.post<T>(
      `http://localhost:1338/api/${endpoint}`,
      body,
      params
    );
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    return this.apiHelperService.put<T>(
      `http://localhost:1338/api/${endpoint}`,
      body,
      params
    );
  }

  async delete<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    return this.apiHelperService.delete<T>(
      `http://localhost:1338/api/${endpoint}`,
      params
    );
  }
  // http methods end here
}
