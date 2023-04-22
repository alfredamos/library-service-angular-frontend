import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  deleteMessage = `Do you want to logout?`;
  deleteTitle = 'Logout Confirmation!';
  showDeleteItem = true;

  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getAuthUser().isLoggedIn!;
  }

  logout(value: boolean) {
    if (value) {
      this.authService.logout();
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
