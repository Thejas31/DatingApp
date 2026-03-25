import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { EditableMember, Member } from '../types/member';
import { Photo } from '../types/member';
import { AccountService } from './account-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/';
  accountService = inject(AccountService);
  editMode = signal(false)
  member = signal<Member | null>(null);
  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'member', this.getDefaultHttpOptions());
  }

  getMember(id : string){
    return this.http.get<Member>(this.baseUrl + 'member/' + id, this.getDefaultHttpOptions()).pipe(
      tap(member=>
      {
        this.member.set(member);
      }
      )
    );
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

  updateMember(member: EditableMember) {
    return this.http.put(this.baseUrl + 'member', member, this.getDefaultHttpOptions());
  }
  
}
