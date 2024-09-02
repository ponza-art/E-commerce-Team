import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../../shared/services/userServices/user-management.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _userManagement = inject(UserManagementService)
  const _router = inject(Router)
  const authData = _userManagement.getAuthData();
  const role = authData.role

  if (role == "admin") {
    return true
  } else {
    _router.navigate(['**'])
    return false;
  }
};
