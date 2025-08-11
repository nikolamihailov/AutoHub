import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { Role } from '../../models';
import { ToastrService } from 'ngx-toastr';

export const isAdminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (auth.currentUser()?.role === Role.ADMIN) return true;

  toast.error('Not authorised!');
  return router.createUrlTree(['/home']);
};
