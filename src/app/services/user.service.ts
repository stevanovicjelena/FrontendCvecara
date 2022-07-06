import { USER_URL } from './../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<any> {

    return this.httpClient.get(`${USER_URL}`);

  }

  public getUserByID(id : number): Observable<any> {

    return this.httpClient.get(`${USER_URL}/${id}`);

  }

  public addUser(user : UserModel) : Observable<any>{

    return this.httpClient.post(`${USER_URL}`, user);

  }

  public updateUser(user : UserModel) : Observable<any>{
    return this.httpClient.put(`${USER_URL}`, user);
  }

  public deleteUser(id : number) : Observable<any>{
    return this.httpClient.delete(`${USER_URL}/${id}`);
  }

}
