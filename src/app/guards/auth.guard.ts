import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  let isLoggedIn = authService.isLoggedIn();

  if(isLoggedIn){
    return true;
  }

  toastr.error("Not logged in!");
  router.navigate(["login"]);
  return false;
};
