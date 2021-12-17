import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API='https://gutendex.com/books?page='

const httpOptions = {
  headers: new HttpHeaders({ 'responseType': 'json' })
};


@Injectable({
  providedIn: 'root'
})



export class BooklistService {

  constructor(private http: HttpClient) { }

  get_data(page: string): Observable<any> {
    return this.http.get(API + page);
  }
}
