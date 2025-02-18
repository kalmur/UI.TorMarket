import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { ILoginDetails } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NavBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(private router: Router) {}
  
  login: ILoginDetails = {
    userName: '',
    password: ''
  }

  onLogin() {
    if (this.login.userName == "admin" && this.login.password == "1337") {
      this.router.navigateByUrl('/products')
    } else {
      alert("Wrong credentials");
    }
  }
}
