import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
}
