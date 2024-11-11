// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getCurrentUser();

    if (!user) {
      return router.createUrlTree(['/auth/login']);
    }

    const hasAllowedRole = user.roles.some(role => allowedRoles.includes(role));

    if (!hasAllowedRole) {
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };
};
