import { LoginModel } from './../models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient : HttpClient) { }

  public login(login : LoginModel) : Observable<any>{

    return this.httpClient.post(`${LOGIN_URL}`, login);

  }

}
