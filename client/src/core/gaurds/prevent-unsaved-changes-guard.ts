import { CanDeactivateFn } from '@angular/router';
import { MemberPhotos } from '../../features/members/member-photos/member-photos';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfile> = (component) => {
  if(component.editForm?.dirty){
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
  }
  return true;
};
