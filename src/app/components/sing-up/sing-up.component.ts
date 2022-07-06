import { UserModel } from './../../models/userModel';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticatedResponse } from 'src/app/models/AuthenticatedResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  invalidLogin : boolean;
  credentials : UserModel = {userID : 0 , imeUser: '', prezimeUser: '', telefonUser: '', emailUser: '', korisnickoImeUser : '', lozinkaUser: '', uloga: ''}

  constructor(private router : Router, private http : HttpClient,
              public snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  login = (form : NgForm) => {
    console.log(this.credentials);
    if (form.valid){
      this.http.post<AuthenticatedResponse>("http://localhost:44265/api/user", this.credentials,{
        headers : new HttpHeaders ({"Content-Type": "application/json"})
      })

    }
        error : (err : HttpErrorResponse) => {
          this.invalidLogin = true
          }
      }
    }

