import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from "../register/register";
import { user } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // @Input({required:true}) membersFromApp: user[] = [];
  protected registerMode = signal(false);
  
  openRegisterMode(value:boolean) {
    this.registerMode.set(value);
  }

}
