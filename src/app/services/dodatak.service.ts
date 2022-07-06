import { DODATAK_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dodatak } from '../models/dodatakModel';


@Injectable({
  providedIn: 'root'
})
export class DodatakService {

  constructor(private httpClient: HttpClient) { }

  public getAllDodaci(): Observable<any> {

    return this.httpClient.get(`${DODATAK_URL}`);

  }

  public addDodatak(dodatak : Dodatak) : Observable<any>{

    return this.httpClient.post(`${DODATAK_URL}`, dodatak);

  }

  public updateDodatak(dodatak : Dodatak) : Observable<any>{
    return this.httpClient.put(`${DODATAK_URL}`, dodatak);
  }

  public deleteCvet(id : number) : Observable<any>{
    return this.httpClient.delete(`${DODATAK_URL}/${id}`);
  }
}
