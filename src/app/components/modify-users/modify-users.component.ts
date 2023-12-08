import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserView } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-modify-users',
  templateUrl: './modify-users.component.html',
  styleUrls: ['./modify-users.component.css']
})
export class ModifyUsersComponent {
  users: UserView[];
  constructor(private userService: UserService,
    private userStore: UserStoreService,
    private router: Router,
    private toastr: ToastrService) { }

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

  editOtherUser(userId: number) {
    debugger;
    this.userService.getOtherUserforEdit(userId).subscribe({
      next: (data) => {
        this.userStore.setUser(data);
        this.router.navigate(["profile-update"])
      }
    })
  }

  onDeleteOtherUser(userId: number) {
    this.userService.deleteOtherUser(userId).subscribe({
      next: (data:any) => {
        // window.location.reload();
        this.toastr.success(data.message)
        this.router.navigate(["dashboard"])
        this.router.navigate(["modify-users"])
      }
    })
  }

}

