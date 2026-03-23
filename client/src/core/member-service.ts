import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Member } from '../types/member';
import { Photo } from '../types/member';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/';
  accountService = inject(AccountService);

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'member', this.getDefaultHttpOptions());
  }

  getMember(id : string){
    return this.http.get<Member>(this.baseUrl + 'member/' + id, this.getDefaultHttpOptions());
  }

  getDefaultHttpOptions(){
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.accountService.currentUser()?.token
      })
    }
  }

  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(
      this.baseUrl + 'member/' + id + '/photos',
      this.getDefaultHttpOptions()
    );
  }
  
}
