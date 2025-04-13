import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [];

  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employee: Employee): void {
    employee.id = new Date().getTime();
    employee.avatar = this.getRandomAvatar();
    this.employees.push(employee);
  }

  updateEmployee(updated: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updated.id);
    if (index !== -1) this.employees[index] = updated;
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  public getRandomAvatar(): string {
    const avatars = [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }
}
