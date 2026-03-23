import { CanActivateFn } from '@angular/router';
import { ToastService } from '../toast-service';
import { AccountService } from '../account-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if(accountService.currentUser()) return true;
  else{
    toast.error('You shall not pass! Please login to access this page.');
    return false;
  }
};
