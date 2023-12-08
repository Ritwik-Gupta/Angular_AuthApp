import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MapperService } from 'src/app/helpers/mapper.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public AppRoles = Role;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private mapper: MapperService) { }

  //Define the form here
  registrationForm = new FormGroup({
    'fname': new FormControl("",[Validators.required]),
    'lname': new FormControl("",[Validators.required]),
    'email': new FormControl("",[Validators.required, Validators.email]),
    'role' : new FormControl("Select Role",[Validators.required]),
    'username': new FormControl("",[Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    'password': new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern("^[a-zA-Z0-9_]*$")])
  })

  //getters for the formcontrol
  get fname() {
    return this.registrationForm.get('fname');
  }
  get lname() {
    return this.registrationForm.get('lname');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get role() {
    return this.registrationForm.get('role');
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }

   onUserRegistration() {
    debugger;

    if(this.registrationForm.valid) {
      let userObj = this.mapper.mapToUserDto(this.registrationForm.value)
      this.authService.registerUser(userObj).subscribe({
        next: (data:any) => {
          this.toastr.success(data.message)
          this.router.navigate(["login"]);
        }
      });
    }

    this.registrationForm.reset();
  }

}
