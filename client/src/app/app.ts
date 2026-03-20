import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { Home } from "../features/home/home";
import { user } from '../types/user';
import { AccountServive } from '../core/account-servive';

@Component({
  selector: 'app-root',
  imports: [ Nav, RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected routerOutlet = inject(Router);
  private http = inject(HttpClient);
  private accountService = inject(AccountServive);
  protected title = 'Dating App';
  protected members = signal<user[]>([]);
router: any;

  async ngOnInit(): Promise<void> {
    this.accountService.initializeUser();
    this.members.set(await this.getMembers())
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get<user[]>('https://localhost:5001/api/member'));
    }
    catch(error){
      console.error(error);
      throw error;
    }
  }




}
