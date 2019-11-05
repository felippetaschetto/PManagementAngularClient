import { User } from './../models/authentication/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  getLoggedUser() : User{
    if(localStorage.getItem('currentUser') != null){
      let userInfo = JSON.parse(localStorage.getItem('currentUser')) as User;
      return new User(userInfo.firstName, userInfo.lastName, userInfo.token, userInfo.salt);
    }

    return null;
  }
  
  private setUserStorage(userStorage: any){
    if (userStorage && userStorage.token){
      let userDetails = new User(userStorage.firstName, userStorage.lastName, userStorage.token, userStorage.renewKey);
      localStorage.setItem('currentUser', JSON.stringify(userDetails));      
    }
  }

  login(userName: string, password: string) {    
    let url = environment.apiUrl + "Authentication/Login";
    return this.http.post<any>(url, { userName: userName, password: password })
        .pipe(map(user => {
            this.setUserStorage(user);
            return user;
        })
        // ,
        // catchError((err) => {
        //   alert("tst");
        //   return Observable.throw(err); 
        // })
        
        );
  }

  exampleGet(){
    return this.http.get<any>('https://localhost:44363/api/values').pipe(map(res => res));
  }

  decodeToken(token: string){    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log("token", decodedToken);
    console.log("roles", decodedToken.role);
  }

  renew() {
    if(this.isLogged()){
    let url = environment.apiUrl + "Authentication/RefreshToken";
    let currentUser = this.getLoggedUser();
    return this.http.post<any>(url, { token: currentUser.token, key: currentUser.salt })
        .pipe(map(user => {
            this.setUserStorage(user);
            return user;
        }));
      }
  }

  logout(){
    localStorage.removeItem('currentUser');    
    this.router.navigate(['/login']);    
  }

  isLogged(){
    return this.getLoggedUser() != null;
  }
}