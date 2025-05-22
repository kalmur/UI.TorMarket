import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { AuthHelperService } from '../../../../core/auth/services/auth-helper.service';

@Component({
  selector: 'app-user-profile-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-profile-detail.component.html',
  styleUrl: './user-profile-detail.component.scss'
})
export class UserProfileDetailComponent {
  private readonly authHelperService = inject(AuthHelperService);

  user = this.authHelperService.user;
}
