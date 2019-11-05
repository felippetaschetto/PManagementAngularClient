import { IUserProfile } from './../models/user/user-profile';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient, private router: Router) { }

  // Send User on Header
  get() : Observable<IUserProfile> {
    let url = environment.apiUrl + "UserProfile/GetUserProfile";
    return this.http.get<IUserProfile>(url)
        .pipe(map(res => res));
  }

  update(userProfile : IUserProfile) : Observable<IUserProfile> {
    let url = environment.apiUrl + "UserProfile";
    return this.http.put<IUserProfile>(url, userProfile)
        .pipe(map(res => res));
  }
  
  uploadPhoto(file) : any {        
    let url = environment.apiUrl + "UserPhoto";
    var formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(url, formData) //, { responseType: 'text'})
        .pipe(map(res => res));    
  }
}
