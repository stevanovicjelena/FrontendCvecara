import { LokacijaModel } from './../models/lokacijaModel';
import { LOKACIJA_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LokacijaService {

  constructor(private httpClient : HttpClient) { }

  public getAllLokacije(): Observable<any> {

    return this.httpClient.get(`${LOKACIJA_URL}`);

  }

  public addLokacija(lokacija : LokacijaModel) : Observable<any>{

    return this.httpClient.post(`${LOKACIJA_URL}`, lokacija);

  }

  public updateLokacija(lokacija : LokacijaModel) : Observable<any>{
    return this.httpClient.put(`${LOKACIJA_URL}`, lokacija);
  }

  public deleteLokacija(id : number) : Observable<any>{
    return this.httpClient.delete(`${LOKACIJA_URL}/${id}`);
  }
}
