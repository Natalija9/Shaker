import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IJwtTokenData } from '../models/jwt-token-data';
import { User } from '../models/user.model'
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urls={
    registerUrl:'http://localhost:5000/api/users/register',
    loginUrl:'http://localhost:5000/api/users/login'
  }

  private readonly userSubject: Subject<User | null> = new Subject<User | null>();
  public readonly user: Observable<User | null> = this.userSubject.asObservable();

  private userLoggedIn: boolean = false;

  constructor(private http:HttpClient, private jwt:JwtService) { }

  public get isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }


  public sendUserDataIfExists(): User | null {
    const payload: IJwtTokenData | null = this.jwt.getDataFromToken();

    const newUser: User | null = payload ? new User(payload.username, payload.password, payload.age) : null;

    this.userSubject.next(newUser);
    this.userLoggedIn = newUser !== null;

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
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      map((response: {token: string}) => this.mapResponseToUser(response))
    )

  }

  public login(username: string, password: string): Observable<User | null> {
    const body = {
      username,
      password,
    };
    const obs: Observable<{token: string}> = this.http.post<{token: string}>(this.urls.loginUrl, body);

    return obs.pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      map((response: {token: string}) => this.mapResponseToUser(response))
    )
  }

  public logout() {
    this.jwt.removeToken();
    this.userSubject.next(null);
    this.userLoggedIn = false;
  }

  private handleError(error: HttpErrorResponse): Observable<{ token: string }> {
    const serverError: { message: string; status: number; stack: string } = error.error;
    window.alert('Error');
    // window.alert(`There was an error: ${serverError.message}. Server returned code: ${serverError.status}`);
    return of({ token: this.jwt.getToken() });
  }

  private mapResponseToUser(response: { token: string }): User | null{
    // Cuvamo JWT u memoriju veb pregledaca
    this.jwt.setToken(response.token);
    // Saljemo podatke o korisniku na osnovu postavljenog JWT tokena
    return this.sendUserDataIfExists();
  }


}
