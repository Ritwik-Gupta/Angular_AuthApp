import { Injectable } from '@angular/core';
import { UserView } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  user$: Observable<UserView>;
  otherUser$: Observable<UserView>;

  constructor() { }

  setUser(userObj: any) {
    this.user$ = new Observable<UserView>(subscriber => {
      subscriber.next(userObj)
    })
  }

  getUser(): Observable<UserView> {
    return this.user$
  }
  
}
