import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModel } from './../../models/login';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/AuthenticatedResponse';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;
  credentials : LoginModel = {korisnickoIme:'', lozinka: ''}

  constructor(private router : Router, private http : HttpClient,
              public snackBar : MatSnackBar) { }

  ngOnInit(): void {

  }

  login = (form : NgForm) => {
    console.log(this.credentials);
    if (form.valid){
      this.http.post<AuthenticatedResponse>("https://localhost:44379/api/auth/login", this.credentials,{
        headers : new HttpHeaders ({"Content-Type": "application/json"})
      })
      .subscribe({
        next : (response : AuthenticatedResponse) => {
          const token = response.Token;
          console.log(token);
          localStorage.setItem("jwt", token);
          const id = response.id;
          console.log(id);
          localStorage.setItem("id", JSON.stringify(id));
          this.invalidLogin = false;
          this.router.navigate(["/home"]
          );

          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(token);
          const payload = JSON.parse(JSON.stringify(decodedToken))
          const uloga = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

          localStorage.setItem("uloga", uloga)

          const username = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier"]
          localStorage.setItem("username", username)

          console.log("decoded token")
          console.log(decodedToken)
          console.log("payload")
          console.log(payload)
          console.log("uloga")
          console.log(uloga)

        },
        error : (err : HttpErrorResponse) => {
          this.invalidLogin = true
          }
      })
    }
  }



}
