import { Injectable } from '@angular/core';
import { IJwtTokenData } from '../models/jwt-token-data';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private static readonly USER_TOKEN_ID = "USER_JWT_TOKEN"; 

  constructor() { }

  public setToken(jwt : string) : void{
      localStorage.setItem(JwtService.USER_TOKEN_ID,jwt);
  }

  public getToken() : string{
    const token : string|null=localStorage.getItem(JwtService.USER_TOKEN_ID);
    if(token===null){
      return '';
    }
    return token;
  }

  public removeToken() : void{
    localStorage.removeItem(JwtService.USER_TOKEN_ID);
  }

  public getDataFromToken() : IJwtTokenData {
    const token=this.getToken();


    const payLoadString:string=token.split('.')[1];
    const userDataJSON:string=atob(payLoadString);
    
    const payload : IJwtTokenData=JSON.parse(userDataJSON);
    return payload;
  }

}
