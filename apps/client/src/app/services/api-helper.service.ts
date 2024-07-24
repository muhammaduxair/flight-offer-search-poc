import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IApiResponse } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  private isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private get apiHeaders() {
    let token = '';
    if (this.isBrowser) {
      token = localStorage.getItem('ACCESS_TOKEN') ?? '';
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    try {
      const response = await lastValueFrom(
        this.http.get<T>(url, {
          headers: this.apiHeaders,
          params,
        })
      );
      return {
        isSuccess: true,
        data: response,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message,
        statusCode: error?.status,
        errors: error,
      };
    }
  }

  async post<T>(
    url: string,
    body?: unknown,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    try {
      const response = await lastValueFrom(
        this.http.post<T>(url, body, {
          headers: this.apiHeaders,
          params,
        })
      );
      return {
        isSuccess: true,
        data: response,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message,
        statusCode: error?.status,
        errors: error,
      };
    }
  }

  async put<T>(
    url: string,
    body?: unknown,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    try {
      const response = await lastValueFrom(
        this.http.put<T>(url, body, {
          headers: this.apiHeaders,
          params,
        })
      );
      return {
        isSuccess: true,
        data: response,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message,
        statusCode: error?.status,
        errors: error,
      };
    }
  }

  async delete<T>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Promise<IApiResponse<T>> {
    try {
      const response = await lastValueFrom(
        this.http.delete<T>(url, {
          headers: this.apiHeaders,
          params,
        })
      );
      return {
        isSuccess: true,
        data: response,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message,
        statusCode: error?.status,
        errors: error,
      };
    }
  }

  async downloadFile(
    endpoint: string,
    options?: {
      method?: 'get' | 'post';
      fileType?: string;
      params?: Record<string, string | number | boolean>;
      body?: unknown;
      fileName?: string;
    }
  ): Promise<void> {
    if (!this.isBrowser) {
      throw new Error('File download is only supported in the browser');
    }

    try {
      let response;

      if (options?.method === 'post') {
        response = await lastValueFrom(
          this.http.post(endpoint, options.body, {
            headers: this.apiHeaders,
            responseType: 'blob',
            params: options.params,
          })
        );
      } else {
        response = await lastValueFrom(
          this.http.get(endpoint, {
            headers: this.apiHeaders,
            responseType: 'blob',
            params: options?.params,
          })
        );
      }

      const blob = new Blob([response], { type: options?.fileType });
      const url = window.URL.createObjectURL(blob);
      // downloadFile(url, options?.fileName);
    } catch (error: any) {
      console.error('File download failed:', error);
      throw error;
    }
  }

  async uploadFile<T>(endpoint: string, file: File): Promise<IApiResponse<T>> {
    if (!this.isBrowser) {
      throw new Error('File upload is only supported in the browser');
    }

    try {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const response = await lastValueFrom(
        this.http.post<T>(endpoint, formData)
      );
      return {
        isSuccess: true,
        data: response,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message,
        statusCode: error?.status,
        errors: error,
        data: error?.error,
      };
    }
  }
}
