import { PAKOVANJE_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pakovanje } from '../models/pakovanjeModel';

@Injectable({
  providedIn: 'root'
})
export class PakovanjeService {

  constructor(private httpClient: HttpClient) { }

  public getAllPakovanja(): Observable<any> {

    return this.httpClient.get(`${PAKOVANJE_URL}`);

  }

  public addPakovanje(pakovanje : Pakovanje) : Observable<any>{

    return this.httpClient.post(`${PAKOVANJE_URL}`, pakovanje);

  }

  public updatePakovanje(pakovanje : Pakovanje) : Observable<any>{
    return this.httpClient.put(`${PAKOVANJE_URL}`, pakovanje);
  }

  public deletePakovanje(id : number) : Observable<any>{
    return this.httpClient.delete(`${PAKOVANJE_URL}/${id}`);
  }
}
