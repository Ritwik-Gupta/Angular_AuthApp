import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { User, UserLogin } from '../models/user';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private httpclient: HttpClient) { }

  baseUrl: string = "https://localhost:7027/api/Users"

  registerUser(userObj: User) {
    return this.httpclient.post(this.baseUrl+"/add-user", userObj);
  }

  userLogin(userObj: UserLogin) {
    return this.httpclient.post(this.baseUrl+"/login", userObj);
  }

  getUsers() {
    const headers =
      new HttpHeaders()
    return this.httpclient.get(this.baseUrl+"/get-users")
  }

  isLoggedIn() {
    let exists = localStorage.getItem("token");
    if(exists){
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }

}
