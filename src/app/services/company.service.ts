import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CompanyRequest } from '../models/authentication/companyRequest';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private router: Router) { }

  create(companyRequest: CompanyRequest) {
    let url = environment.apiUrl + "Company";
    console.log(companyRequest);
    return this.http.post<any>(url, companyRequest)
        .pipe(map(res => {
            return res;
        }));
  }
}
