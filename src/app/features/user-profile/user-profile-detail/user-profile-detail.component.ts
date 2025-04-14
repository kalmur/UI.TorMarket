import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../core/components/nav-bar/nav-bar.component';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-profile-detail.component.html',
  styleUrl: './user-profile-detail.component.scss'
})
export class UserProfileDetailComponent {
  private readonly auth = inject(AuthService);

  user$: Observable<any> = this.auth.user$;
}
