import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthHelperService } from './auth-helper.service';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  readonly authHelperService = inject(AuthHelperService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  // Revisit later to implement a more robust role management system
  async canActivate(): Promise<boolean> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      const userFromDb = await this.userService.getUserByProviderId(user.sub);
      if (userFromDb?.roleId === 1) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
    return false;
  }
}
