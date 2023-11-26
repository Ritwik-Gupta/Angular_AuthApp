import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { MapperService } from 'src/app/helpers/mapper.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: AuthService,
    private mapper: MapperService,
    private toastr: ToastrService,
    private router: Router) {}

  //create the form group
  userLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  //Getters for the form
  get username() {
    return this.userLoginForm.get('username');
  }
  get password() {
    return this.userLoginForm.get("password");
  }

  onUserLogin() {
    debugger;
    if(this.userLoginForm.valid) {
      let userObj = this.mapper.mapToUserLoginDto(this.userLoginForm.value)

      this.service.userLogin(userObj).subscribe({
        next: (data:any) => {
          this.toastr.success(data.message)
          localStorage.setItem("loggedInUser", userObj.username)
          localStorage.setItem("token", data.token)

          console.log(data.token);
          this.router.navigate(["dashboard"])
        },
        error: (err) => this.toastr.error(err.error.message ?? err.message)
      });
    }

  }
}
