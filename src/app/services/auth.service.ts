import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private httpclient: HttpClient) { }

  baseUrl: string = "https://localhost:7027/api/Users"

  registerUser(userObj: object) {
    this.httpclient.post(this.baseUrl, userObj).subscribe(response => {
      return response;
    })
  }

}
