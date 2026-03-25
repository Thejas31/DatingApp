import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/toast-service';
import { AccountService } from '../../../core/account-service';


@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  // private route = inject(ActivatedRoute);
  // protected member = signal<Member | undefined>(undefined);
  protected memberService = inject(MemberService);
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: '',
  };
  private accountService = inject(AccountService)
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
    };
  }

  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = { ...this.memberService.member(), ...this.editableMember }
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser= this.accountService.currentUser();
        if(currentUser && updatedMember.displayName !== currentUser?.displayName) currentUser.displayName = updatedMember.displayName
        this.toast.success('Profile updated successfully.');
        this.memberService.editMode.set(false);
        this.editForm?.reset(updatedMember);
        this.memberService.member.set(updatedMember as Member);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
