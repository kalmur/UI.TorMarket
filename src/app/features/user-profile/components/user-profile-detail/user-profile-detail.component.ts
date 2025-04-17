import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-profile-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-profile-detail.component.html',
  styleUrl: './user-profile-detail.component.scss'
})
export class UserProfileDetailComponent {
  constructor(private readonly authService: AuthService) {}

  user$: Observable<any> = this.authService.user$;
}
