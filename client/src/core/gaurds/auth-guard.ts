import { CanActivateFn } from '@angular/router';
import { ToastService } from '../toast-service';
import { AccountServive } from '../account-servive';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServive);
  const toast = inject(ToastService);

  if(accountService.currentUser()) return true;
  else{
    toast.error('You shall not pass! Please login to access this page.');
    return false;
  }
};
