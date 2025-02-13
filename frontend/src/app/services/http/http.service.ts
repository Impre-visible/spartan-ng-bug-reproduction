import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.BACKEND_SERVER_URL;
  }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`, { params, headers }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${url}`, body, { headers }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${url}`, body, { headers }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}${url}`, body, { headers }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  delete<T>(url: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${url}`, { headers: headers, body: body }).pipe(
      map(response => this.handleResponse(response)),
      catchError(error => this.handleError(error))
    );
  }

  private handleResponse<T>(response: any): any {
    if (!response.error) {
      return response;
    }
    throw new Error(response.message);
  }

  private handleError(error: any): Observable<any> {
    console.error('Une erreur est survenue:', error);
    toast.error('Une erreur est survenue', { "description": error.message });
    return new Observable(observer => {
      observer.next({
        message: 'Une erreur est survenue',
        data: null,
        error: true
      });
      observer.complete();
    });
  }
}
