import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService,
    private httpclient: HttpClient) { }

  baseUrl: string = "https://localhost:7027/api/Users"

  getLoggedInUser() {
    return {
      id: localStorage.getItem("id"),
      username: localStorage.getItem("username") ?? "Undefined",
      role: localStorage.getItem("role") ?? "Undefined"
    };
  }

  getUsers() {
    return this.httpclient.get(this.baseUrl+"/get-users");
  }

  getUserforEdit(userId: number) {
    return this.httpclient.get(this.baseUrl+`/get-user-detail?userId=${userId}`);
  }

  updateUserDetail(userObj: UserView) {
    debugger;
    return this.httpclient.post(this.baseUrl+"/update-user", userObj);
  }

  getOtherUserforEdit(userId:number) {
    return this.httpclient.get(this.baseUrl+`/get-other-userdetail?userId=${userId}`);
  }

  deleteOtherUser(userId: number) {
    return this.httpclient.get(this.baseUrl+`/delete-other-user?userId=${userId}`);
  }

}
