import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent {
  user$ = combineLatest([this.userService.users$, this.route.paramMap]).pipe(
    map(([users, paraMap]) => {
      const id = paraMap.get('id');
      return users.find((user) => user.id === id);
    })
  );

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  backToList() {
    this.router.navigate(['/users']);
  }
}
