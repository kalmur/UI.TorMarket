import { Component, inject, model } from '@angular/core';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { DatabaseUser } from '../../../../core/models/user';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserDetailComponent,
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  users = model<DatabaseUser[]>([]);

  constructor() {
    this.fetchUsers();
  }

  private async fetchUsers(): Promise<void> {
    const response = await this.userService.getAllUsers();
    if (response && response.length > 0) {
      this.users.set(response);
    } else {
      this.users.set([]);
    }
  }
}