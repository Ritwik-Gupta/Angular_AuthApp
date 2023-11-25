import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getLoggedInUser() {
    return localStorage.getItem("loggedInUser") ?? "Undefined";
  }
}
