import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/authentication/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  loggedUser: User;
  tst: string;

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loggedUser = this.authenticationService.getLoggedUser();
  }

  logout(){
    this.authenticationService.logout();
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

}
