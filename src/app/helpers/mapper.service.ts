import { Injectable } from '@angular/core';
import { User, UserLogin, UserView } from '../models/user';
import { Role } from '../models/role';

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
      password : userObj.password,
      role : userObj.role
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

  mapToUserViewDto(userObj: any): UserView {
    let mappedUser: UserView = {
      id : userObj.id,
      fname : userObj.fname,
      lname : userObj.lname,
      email : userObj.email,
      username: userObj.username,
      role : userObj.role
    }
    return mappedUser;
  }
}
