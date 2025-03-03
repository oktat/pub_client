import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const superGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  if(!authService.isSuper()) {
    return false;
  }

  return true;
};
