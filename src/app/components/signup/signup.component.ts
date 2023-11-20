import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  //Define the form here
  registrationForm = new FormGroup({
    'fname': new FormControl('', [Validators.required]),
    'lname': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
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
  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }

}