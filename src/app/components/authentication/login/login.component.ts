import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notifications/notification.service';
//import { Globals } from 'src/app/globals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loginFormSubmited : boolean = false;  

  constructor(private formBuilder: FormBuilder,    
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
    ) { }
    

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  loginSubmit(){
    this.loginFormSubmited = true;
    if (this.loginForm.invalid && false) {
      return;
    }
    else{
      this.authenticationService.login(this.f.username.value, this.f.password.value)      
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if(error.status === 400){
            console.log("error 400", error);
            for(let key in error.error) {
              let control = this.loginForm.controls[key.toLowerCase()];
              if(control){                
                control.setErrors({ remote: error.error[key] });
              }
            }
          }
          console.log(error);
        }
      );
    }
  }
}


//http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial