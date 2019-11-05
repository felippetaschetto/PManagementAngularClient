import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/authentication/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.exampleGet()
      .subscribe(
          data => {
            console.log("success", data);            
          },
          error => {
            console.log("error - ", error);
      });
      
      let user = this.authenticationService.getLoggedUser();
      user.getRoles();      
  }

  ngOnInit() {
  }

}