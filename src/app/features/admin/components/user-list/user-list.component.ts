import { Component, signal } from '@angular/core';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { SiteUser } from '../../../../core/models/user';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';

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
  users = signal<SiteUser[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', picture: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', picture: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', picture: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', picture: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', picture: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', picture: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ]);
}
