import { Component, OnInit } from '@angular/core';
import { tap, take } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  authUser$ = this.authService.authUser$;

  constructor(private authService: AuthService) {}

}
