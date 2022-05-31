import { Cvet } from './../models/cvetModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CVET_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CvetServiceService {

  constructor(private httpClient: HttpClient) { }

  public getAllCvetovi(): Observable<any> {

    return this.httpClient.get(`${CVET_URL}`);

  }

  public addCvet(cvet : Cvet) : Observable<any>{

    return this.httpClient.post(`${CVET_URL}`, cvet);

  }

  public updateCvet(cvet : Cvet) : Observable<any>{
    return this.httpClient.put(`${CVET_URL}`, cvet);
  }

  public deleteCvet(id : number) : Observable<any>{
    return this.httpClient.delete(`${CVET_URL}/${id}`);
  }
}
