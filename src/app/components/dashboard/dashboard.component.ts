import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  role: string;

  users: Array<string>;

  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.username = this.userService.getLoggedInUser().username;
    this.role = this.userService.getLoggedInUser().role;
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data: any) => this.users = data,
    })
  }

  editMyProfile() {
    const userId = +localStorage.getItem("id");

    this.userService.getUserforEdit(userId).subscribe({
      next: (data) => {
        this.userStore.setUser(data)
        this.router.navigate(["profile-update"])
      }
    })
  }

}
