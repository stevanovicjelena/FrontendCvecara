import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){

      return true;
    }

    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("uloga");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("aranzmani");
  }

}
