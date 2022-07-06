import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PORUDZBINA_BY_KUPAC_URL, PORUDZBINA_URL } from "../app.constants";
import { Porudzbina } from "../models/porudzbinaModel";



@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private httpClient: HttpClient) { }

  public getAllPorudzbine(): Observable<any> {

    return this.httpClient.get(`${PORUDZBINA_URL}`);

  }

  public getPorudzbinaByKupac(idKupca : number) : Observable<any> {

    return this.httpClient.get(`${PORUDZBINA_BY_KUPAC_URL}/${idKupca}`);

  }

  public addPorudzbina(porudzbina : Porudzbina) : Observable<any>{

    return this.httpClient.post(`${PORUDZBINA_URL}`, porudzbina);

  }

  public updatePorudzbina(porudzbina : Porudzbina) : Observable<any>{
    return this.httpClient.put(`${PORUDZBINA_URL}`,  porudzbina);
  }

  public deletePorudzbina(id : number) : Observable<any>{
    return this.httpClient.delete(`${PORUDZBINA_URL}/${id}`);
  }
}
