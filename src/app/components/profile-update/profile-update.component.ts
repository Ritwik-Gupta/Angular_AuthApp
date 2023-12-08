import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MapperService } from 'src/app/helpers/mapper.service';
import { Role } from 'src/app/models/role';
import { UserView } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent  implements OnInit{
  public AppRoles = Role;
  user: UserView = {} as UserView;
  userDetailsUpdateForm : FormGroup;

  constructor(private userStore: UserStoreService,
    private userService: UserService,
    private mapperService: MapperService,
    private toastr: ToastrService,
    private router: Router) {

    this.userStore.getUser().subscribe({
      next: (data) => this.user = data
    })
    console.log(this.user);
  }

  ngOnInit(): void {
    this.userDetailsUpdateForm = new FormGroup({
      fname : new FormControl(this.user.fname, [Validators.required]),
      lname : new FormControl(this.user.lname, [Validators.required]),
      email : new FormControl(this.user.email, [Validators.required, Validators.email]),
      username : new FormControl(this.user.username, [Validators.required]),
      role : new FormControl(this.user.role, [Validators.required])
    })
    this.username.disable();
  }

  //getters for the form
  get fname() {
    return this.userDetailsUpdateForm.get("fname")
  }
  get lname() {
    return this.userDetailsUpdateForm.get("lname")
  }
  get email() {
    return this.userDetailsUpdateForm.get("email")
  }
  get username() {
    return this.userDetailsUpdateForm.get("username")
  }
  get role() {
    return this.userDetailsUpdateForm.get("role")
  }

  UpdateUser() {
    let userObj = this.mapperService.mapToUserViewDto(this.userDetailsUpdateForm.value)
    userObj.id = this.user.id;

    this.userService.updateUserDetail(userObj).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.router.navigate(["dashboard"]);
      }
    })
  }
}
