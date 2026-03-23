import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected router = inject(Router);
  protected cred : any = {}
  protected accountservice = inject(AccountService);
  protected loggedIn = this.accountservice.currentUser;
  private toast = inject(ToastService);
user: any;

  login(){
    this.accountservice.login(this.cred).subscribe({
       next: result => {
         console.log(result);
         this.toast.success('Login successful.');
         this.router.navigateByUrl('/members');
       },
       error: error => {
         this.toast.error('Login failed. Please check your credentials.');
       }
    });
  }

  logout(){
    this.accountservice.logout();
    this.cred = {};
    this.router.navigateByUrl('/');
  }
}
