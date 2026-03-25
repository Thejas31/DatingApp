import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { registerCreds, user } from '../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<user | null>(null);

  register(creds: registerCreds){
    return this.http.post<user>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  login(creds: any) {
    return this.http.post<user>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: user) {
    // const normalizedUser = this.normalizeUser(user);
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  // initializeUser() {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     this.currentUser.set(this.normalizeUser(user));
  //   }
  // }


  // private getTokenPayload(token?: string): any | null {
  //   if (!token) return null;

  //   try {
  //     const payload = token.split('.')[1];
  //     if (!payload) return null;

  //     const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  //     const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
  //     return JSON.parse(atob(padded));
  //   } catch {
  //     return null;
  //   }
  // }
}
