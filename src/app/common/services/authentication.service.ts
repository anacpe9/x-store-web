import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterDto } from '../models/register.dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | undefined>;
  public currentUser: Observable<User | undefined>;

  constructor(private http: HttpClient) {
    const usr = localStorage.getItem('currentUser') as string;
    this.currentUserSubject = new BehaviorSubject<User | undefined>(JSON.parse(usr));
    this.currentUser = this.currentUserSubject.asObservable();
}

  public get currentUserValue(): User | undefined {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }

  login(
    username: string | null | undefined,
    password: string | null | undefined,
  ) {
    return this.http
      .post<any>(`/api/v1/accounts/auth/login`, { email: username, password: password })
      .pipe(map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  register(
    payload: RegisterDto,
  ) {
    return this.http
      .post<any>(`/api/v1/accounts/auth/signup`, payload)
      .pipe(map((userId) => {
        // // login successful if there's a jwt token in the response
        // if (user && user.token) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   this.currentUserSubject.next(user);
        // }

        return userId;
      }));
  }
}
