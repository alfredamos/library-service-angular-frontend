import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-detail-department',
  templateUrl: './detail-department.component.html',
  styleUrls: ['./detail-department.component.css'],
})
export class DetailDepartmentComponent {
  department$ = combineLatest([
    this.departmentService.departments$,
    this.route.paramMap,
  ]).pipe(
    map(([departments, paraMap]) => {
      const id = paraMap.get('id');
      return departments.find((department) => department.id === id);
    })
  );

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editClick(id: string) {
    this.router.navigate([`/edit-department/${id}`]);
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
