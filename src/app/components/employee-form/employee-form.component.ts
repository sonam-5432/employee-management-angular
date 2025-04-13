import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
// Removed MatErrorModule as it does not exist

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    // Removed MatErrorModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });

    // Check if we are in edit mode
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployeeData(id);
      }
    });
  }

  loadEmployeeData(id: number) {
    const employee = this.employeeService.getEmployeeById(id);
    if (employee) {
      this.employeeForm.patchValue(employee);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    // if (this.employeeForm.invalid) return;

    const formValue = this.employeeForm.value;
    if (this.isEditMode && this.employeeId) {
      // Update existing employee
      const updatedEmployee: Employee = { ...formValue, id: this.employeeId, avatar: formValue.avatar };
      this.employeeService.updateEmployee(updatedEmployee);
    } else {
      console.log('Adding new employee');
      
      // Add new employee
      const newEmployee: Employee = { ...formValue, id: new Date().getTime(), avatar: this.employeeService.getRandomAvatar() };
      this.employeeService.addEmployee(newEmployee);
    }

    this.router.navigate(['/']);
  }
}
