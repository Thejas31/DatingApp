import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerCreds, user } from '../../types/user';
import { AccountServive } from '../../core/account-servive';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // membersFromHome = input.required<user[]>();    [membersFromHome]="membersFromApp" put this in home.html and remove this line from register.ts
  protected cred = {} as registerCreds; 
  cancelRegister = output<boolean>();
  private accountService = inject(AccountServive);

  register(){
    return this.accountService.register(this.cred).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  

  cancel(){
    this.cancelRegister.emit(false);
  }

}
