import { Component, OnInit } from '@angular/core';
import { User, UserView } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})

export class UserSummaryComponent implements OnInit {
  users: UserView[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    debugger;
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        debugger;
        this.users = data
        console.log(this.users)
      }
    })
  }
}
