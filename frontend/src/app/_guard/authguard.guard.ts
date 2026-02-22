import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService)
  const router=inject(Router)
  
   if (state.url === '/sign-out') {
    return true;
  }
  if(!auth.LogedIn()){
    router.navigate(['/login'])
    return false
  }
  return true;
};
