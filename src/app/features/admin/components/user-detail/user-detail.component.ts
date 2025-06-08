import { Component, input } from '@angular/core';
import { DatabaseUser } from '../../../../core/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  // Change to IdentityProviderUser later
  user = input<DatabaseUser>();
}
