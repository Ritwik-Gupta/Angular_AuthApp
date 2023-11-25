import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapToUserDto(userObj: any): User {
    let mappedUser: User = {
      fname : userObj.fname,
      lname : userObj.lname,
      email : userObj.email,
      username: userObj.username,
      password : userObj.password
    }
    return mappedUser;
  }

  mapToUserLoginDto(userObj: any): UserLogin {
    let mappedUser: UserLogin = {
      username : userObj.username,
      password : userObj.password
    }
    return mappedUser;
  }
}
