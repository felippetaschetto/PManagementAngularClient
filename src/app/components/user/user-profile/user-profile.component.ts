import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { IUserProfile } from 'src/app/models/user/user-profile';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  userProfile : IUserProfile = {} as IUserProfile;
  profileForm: FormGroup;
  formSubmited: boolean = false;
  isLoading: boolean = true;  
  imgURL: any;

  constructor(private formBuilder: FormBuilder, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.get()      
     .subscribe(
         data => {
          this.userProfile = data;
          this.profileForm.patchValue(this.userProfile);
          this.isLoading = false;
          this.imgURL = this.userProfile.fileName ? environment.imgUrl + this.userProfile.fileName : "";
         },
         error => {
          console.log("error - ", error);
     });
     this.createForm();
  }

validateControl(control : any){
  if(this.formSubmited && control.errors)
    return true;

  return false;
}

  formSubmit(){
    this.formSubmited = true;
      if (this.profileForm.invalid)
        return;

    let profile : IUserProfile = Object.assign({}, this.profileForm.value);
      
    this.userProfileService.update(profile)
     .subscribe(
         data => {
          console.log("success");
         },
         error => {
          console.log("error - ", error);
     });
  }

  createForm(){
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    // var reader = new FileReader();    
    // reader.readAsDataURL(nativeElement.files[0]); 
    // reader.onload = (_event) => { 
    //   this.imgURL = reader.result; 
    // }

     if (nativeElement != null && nativeElement.files != null && nativeElement.files.length > 0) {
        this.userProfileService.uploadPhoto(nativeElement.files[0])
            .subscribe( 
              data => {
                this.imgURL = data.url ? data.url : environment.imgUrl + data.fileName;
              }
        );
     }
  }
}
