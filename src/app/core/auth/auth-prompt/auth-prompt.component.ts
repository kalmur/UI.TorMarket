import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-prompt',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './auth-prompt.component.html',
  styleUrl: './auth-prompt.component.scss'
})
export class AuthPromptComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) {}

  action = 'perform this action';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || this.action;
    });
  }
}
