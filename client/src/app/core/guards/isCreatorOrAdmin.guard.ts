import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService, CarOfferService } from '../services';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../models';

export const isCreatorOrAdminGuard: CanActivateFn = (route, _) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  const carOfferService = inject(CarOfferService);

  const carOfferId = route.paramMap.get('id')!;
  const currentUser = authService.currentUser();

  return carOfferService.getCarOffer(carOfferId).pipe(
    map((carOffer) => {
      const isAdmin = currentUser?.role === Role.ADMIN;
      const isCreator = carOffer?.creator._id === currentUser?._id;

      if (!carOffer || (!isCreator && !isAdmin)) {
        router.navigate(['/car-offers']);
        toast.error("Can't edit offer!");
        return false;
      }

      return true;
    }),
    catchError((err) => {
      router.navigate(['/not-found']);
      toast.error('Offer not found or error occurred.');
      return of(false);
    }),
  );
};
