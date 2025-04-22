import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { AuthHelperService } from '../../../../core/auth/services/auth-helper.service';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-profile-detail.component.html',
  styleUrl: './user-profile-detail.component.scss'
})
export class UserProfileDetailComponent {
  private readonly authHelperService: AuthHelperService = inject(AuthHelperService);

  user = model<User | null | undefined>(null);

  constructor() {
    this.authHelperService.user$.subscribe((user) => {
      this.user.set(user);
    });
  }
}
