import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { User, UserLogin } from '../models/user';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private httpclient: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  baseUrl: string = "https://localhost:7027/api/Users"

  registerUser(userObj: User) {
    return this.httpclient.post(this.baseUrl+"/add-user", userObj);
  }

  userLogin(userObj: UserLogin) {
    return this.httpclient.post(this.baseUrl+"/login", userObj);
  }

  isLoggedIn() {
    let exists = localStorage.getItem("token");
    if(exists){
      return true;
    }
    return false;
  }

  getAuthToken() {
    return localStorage.getItem("token");
  }

  setAuthToken(token: string) {
    localStorage.setItem("token", token);
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  setLoggedInUserDetails(id: string, username: string, role: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("role",role);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  tryRefreshToken(userId: number) {
    return this.httpclient.get(this.baseUrl + `/try-refresh-token?userId=${userId}`);
  }

  setRefreshStatus(status: boolean) {
    localStorage.setItem("isRefresh", status == true ? "true" : "false");
  }

  getRefreshStatus(): boolean {
    return localStorage.getItem("isRefresh") == "true" ? true : false;

  }
}
