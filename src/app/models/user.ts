import { Role } from "./role"


export interface User {
  fname: string,
  lname: string,
  email: string,
  username: string,
  password: string,
  role: string
}

export interface UserLogin {
  username: string,
  password: string
}

export interface UserView {
  id: number,
  fname: string,
  lname: string,
  email: string,
  username: string,
  role: string
}
