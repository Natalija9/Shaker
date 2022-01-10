import { Injectable } from '@angular/core';
import { IJwtTokenData } from '../models/jwt-token-data';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private static readonly USER_TOKEN_ID = 'USER_JWT_TOKEN';

  constructor() { }

  public setToken(token:string):void{
    localStorage.setItem(JwtService.USER_TOKEN_ID,token);
  }

  public getToken():string{
    const token:string|null=localStorage.getItem(JwtService.USER_TOKEN_ID);
    if(!token){
      return '';
    }
    return token;
  }

  public removeToken():void{
    localStorage.removeItem(JwtService.USER_TOKEN_ID);
  }

  public getDataFromToken(): IJwtTokenData | null{

    const token = this.getToken();
    if(token === '')
      return null;
    const payloadString: string=token.split('.')[1];
    const userDataJson:string=atob(payloadString);

    const payload:IJwtTokenData=JSON.parse(userDataJson);

    return payload;
  }
}

