import { CompanyRequest, CompanyInfo } from '../../../models/authentication/companyRequest';
import { RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  step : number = 1;
  companyDetailsForm: FormGroup;
  userDetailsForm: FormGroup;
  companyFormSubmited : boolean = false;
  userFormSubmited : boolean = false;  
  companyRequest : CompanyRequest = new CompanyRequest();


  constructor(private formBuilder: FormBuilder,    
    private router: Router,
    private companyService: CompanyService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.companyDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone:['', Validators.required],
      country:['', Validators.required],
      city:['', Validators.required],
      postCode:['', Validators.required],
      address:['', Validators.required]
    });
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['', Validators.required],
      country:['', Validators.required],
      city:['', Validators.required],
      postCode:['', Validators.required],
      address:['', Validators.required],
      birthdate:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    });    
  }

  // convenience getter for easy access to form fields
  get f() { return this.companyDetailsForm.controls; }

  userSubmit(){    
    this.userFormSubmited = true;
    if (this.userDetailsForm.invalid)
       return;
    
    this.companyRequest.userInfo = Object.assign({}, this.userDetailsForm.value);
    
     this.companyService.create(this.companyRequest)      
     .subscribe(
         data => {
          this.notificationService.showSuccess("Registered with success.");
          this.router.navigate(['/login']);
        });
  }

  previousClick(){    
    this.step = 1;
  }

  companySubmit(){
    this.companyFormSubmited = true; 
    if (this.companyDetailsForm.invalid)
       return;
     
    this.companyRequest.companyInfo = Object.assign({}, this.companyDetailsForm.value);    
    this.step = 2;
  }
}
