import { Component, inject, Input } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-prompt',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './auth-prompt.component.html',
  styleUrl: './auth-prompt.component.scss'
})
export class AuthPromptComponent {
  private readonly route = inject(ActivatedRoute);

  action: string = 'perform this action';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || this.action;
    });
  }
}
