import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/member-service';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  protected memberService = inject(MemberService);
  protected members$ = this.memberService.getMembers();

  constructor(){
    this.members$ = this.memberService.getMembers();
  }
}
