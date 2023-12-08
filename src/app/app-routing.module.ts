import { Input, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UserSummaryComponent } from './components/dashboard/user-summary/user-summary.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ModifyUsersComponent } from './components/modify-users/modify-users.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch: 'full'},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [authGuard]},
  {path:"all-users", component: UserSummaryComponent},
  {path:"profile-update", component: ProfileUpdateComponent},
  {path:"modify-users", component: ModifyUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
