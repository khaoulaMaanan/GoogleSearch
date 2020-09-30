import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search(searchQuery){
    let params = new HttpParams();
    params = params.append('searchquery', searchQuery);
    return this.http.get(`${baseUrl}/search`, { params: params } );
  }

}
