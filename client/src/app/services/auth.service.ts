import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    loginUrl:''
  }

  constructor(private http:HttpClient,
              private jwt:JwtService) { }

  public registerUser(username:string,password:string,age:string) : Observable<User | null>{
    const body={
      username,
      password,
      age
    };
    const obs:Observable<{token:string}>= this.http.post<{token:string}>(this.urls.registerUrl,body);
    return obs.pipe(
      tap((response:{token:string}) => this.jwt.setToken(response.token)),
      map((response:{token:string}) => {
        const payload:IJwtTokenData = this.jwt.getDataFromToken();

        return new User(payload.username,payload.password,payload.age);
      })
    );
  }
}