import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { ToastrService } from 'ngx-toastr';

export const isAuthGuard: CanActivateFn = (_, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (auth.isLoggedIn()) return true;

  toast.error('You should login for access!');
  return router.createUrlTree(['/login'], {
    queryParams: { redirectTo: state.url },
  });
};
