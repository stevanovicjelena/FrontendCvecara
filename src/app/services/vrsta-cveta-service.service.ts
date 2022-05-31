import { VrstaCveta } from './../models/vrstaCvetaModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VRSTACVETA_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class VrstaCvetaServiceService {

  constructor(private httpClient: HttpClient) { }

  public getAllVrste(): Observable<any> {

    return this.httpClient.get(`${VRSTACVETA_URL}`);

  }

  public addVrste(vrsta : VrstaCveta) : Observable<any>{

    return this.httpClient.post(`${VRSTACVETA_URL}`, vrsta);

  }

  public updateVrsta(vrsta : VrstaCveta) : Observable<any>{
    return this.httpClient.put(`${VRSTACVETA_URL}`, vrsta);
  }

  public deleteVrsta(id : number) : Observable<any>{
    return this.httpClient.delete(`${VRSTACVETA_URL}/${id}`);
  }
}
