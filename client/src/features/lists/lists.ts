import { Component } from '@angular/core';
import { MemberList } from "../members/member-list/member-list";

@Component({
  selector: 'app-lists',
  imports: [MemberList],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists {}
