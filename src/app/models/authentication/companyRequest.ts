//https://stackblitz.com/edit/github-rbjwcd?file=src%2Fapp%2Fmodels%2Fcontact-request.ts

export class CompanyRequest {
  companyInfo: CompanyInfo;
  userInfo: UserInfo;

  constructor(){
    this.companyInfo = new CompanyInfo();
    this.userInfo = new UserInfo();
  }
}

export class CompanyInfo {
  name: string = '';
  email: string = '';
  phone: string = '';
  country: string = '';
  city: string = '';
  postCode: string = '';
  address: string = '';
}

export class UserInfo {
  firstName: string = '';
  lastName: string = '';
  email:string = '';
  phone:string = '';
  country:string = '';
  city:string = '';
  postCode:string = '';
  address:string = '';
  birthdate:Date = new Date();
  password: string = '';
}
