import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public router: Router
  ) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  onView(id: number) {
    this.router.navigate(['/view', id]);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  onDelete(id: number) {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getEmployees();
    }
  }
}
