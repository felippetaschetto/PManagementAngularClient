import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Globals } from '../globals';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, 
                private authenticationService: AuthenticationService,
                private globals: Globals) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        let currentUser = this.authenticationService.getLoggedUser();
        
        if (currentUser && currentUser.isValid()){
            let roles = route.data["roles"] as Array<string>;
            if(roles){
                console.debug("roles ", roles);
            }

            return true;
        }
        
        if(state.url == "/")
            this.router.navigate(['/login']);
        else
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            
        return false;
    }
}