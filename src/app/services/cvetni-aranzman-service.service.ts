import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CVETNIARANZMAN_URL } from '../app.constants';
import { CvetniAranzman } from '../models/cvetniAranzmanModel';

@Injectable({
  providedIn: 'root'
})
export class CvetniAranzmanServiceService {

  constructor(private httpClient : HttpClient) { }

  public getAllCvetniAranzmani(): Observable<any> {

    return this.httpClient.get(`${CVETNIARANZMAN_URL}`);

  }

  public addCvetniAranzman(cvetniAranzman : CvetniAranzman) : Observable<any>{

    return this.httpClient.post(`${CVETNIARANZMAN_URL}`, CvetniAranzman);

  }

  public updateCvetniAranzman(cvetniAranzman : CvetniAranzman) : Observable<any>{
    return this.httpClient.put(`${CVETNIARANZMAN_URL}`, cvetniAranzman);
  }

  public deleteCvetniAranzman(id : number) : Observable<any>{
    return this.httpClient.delete(`${CVETNIARANZMAN_URL}/${id}`);
  }
}
