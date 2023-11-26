import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.username = this.userService.getLoggedInUser();
  }

  getUsers() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
    this.toastr.success("Logged out successfully")
  }
}
