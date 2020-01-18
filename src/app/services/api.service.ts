//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
        'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item): Observable<Product> {
    return this.http
        .post<Product>(this.base_path + 'product', JSON.stringify(item), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  // Get single Product data by ID
  getItem(id): Observable<Product> {
    return this.http
        .get<Product>(this.base_path + '/' + id)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  // Get Product data
  getList(): Observable<Product> {
    return this.http
        .get<Product>(this.base_path+'products')
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
        .delete<Product>(this.base_path + 'product/' + id, this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

}
