import { Component, inject, Signal, signal } from '@angular/core';
import { MemberService } from '../../../core/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-detailed',
  imports: [AgePipe, RouterLink, RouterLinkActive,RouterOutlet],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed {
  private memberService = inject(MemberService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  protected member = signal<Member | undefined>(undefined)
  protected title = signal<string | undefined>('Profile')

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data=>this.member.set(data['member'])
      
    }) 
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    )
  }
}
