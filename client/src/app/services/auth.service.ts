import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {map,tap} from 'rxjs/operators';
import { IJwtTokenData } from '../models/jwt-token-data';
import { User } from '../models/user.model'
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urls={
    registerUrl:'http://localhost:5000/api/users/register',
    loginUrl:'"http://localhost:5000/api/users/login"'
  }

  private readonly userSubject: Subject<User | null> = new Subject<User | null>();
  public readonly user: Observable<User | null> = this.userSubject.asObservable();



  constructor(private http:HttpClient,
              private jwt:JwtService) { }

  public sendUserDataIfExists(): User | null {
    const payload: IJwtTokenData | null = this.jwt.getDataFromToken();
      if(!payload) {
          return null;
          }
            
      const newUser: User =  new User(payload.username, payload.password, payload.age);
      this.userSubject.next(newUser);
          return newUser;
  }
            

  public registerUser(username:string,password:string,age:string) : Observable<User | null>{
    const body={
      username,
      password,
      age
    };
    const obs:Observable<{token:string}>= this.http.post<{token:string}>(this.urls.registerUrl,body);
    return obs.pipe(
      tap((response: {token: string}) => this.jwt.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )

  }

  public login(username: string, password: string): Observable<User | null> {
    const body = {
      username,
      password,
    };
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.urls.loginUrl, body);
  
    // prvo treba sacuvati token, a onda ga 'pretvoriti' u korisnika
    return obs.pipe(
      tap((response: {token: string}) => this.jwt.setToken(response.token)),
      map((response: {token: string}) => this.sendUserDataIfExists())
    )
  }



}