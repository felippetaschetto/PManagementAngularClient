import { JwtHelperService } from "@auth0/angular-jwt";

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public token: string,    
        public salt: string
    ){}

    public getRoles() {        
        return "abc";        
    }

    public hasRole(role: string): boolean {
        return true;  
    }

    public isValid(){
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(this.token);
    }
}