import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeePosition } from 'src/app/enums/employeePosition ';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['select', 'employeeId', 'lastName', 'email', 'salary', 'employeePosition', 'shopId', 'action'];
  selection = new SelectionModel<Employee>(true, []);

  selectedValues: number[] = [];

  value: string = '';

  employees: Employee[] = [];

  employeePosition = [
    { number: EmployeePosition.Menager, name: "Menager" },
    { number: EmployeePosition.Seller, name: "Seller " },
    { number: EmployeePosition.Technician, name: "Techniciane" },
    { number: EmployeePosition.OfficeWorker, name: "Office worker" },
    { number: EmployeePosition.Driver, name: "Driver" }
  ]

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Employee>([])
  }

  ngOnInit() {
    this.getEmployee('');
  }

  getTotalSalary(): number {
    return this.employees.reduce((total, employee) => total + employee.salary, 0);
  }

  getTotalNumberOfEmployees(): number {
    return this.employees.length;
  }

  getEmployee(searchTerm?: string, selectedValues?: number[]) {
    this.employeeService.getEmployees(searchTerm, selectedValues).subscribe(
      (result: Employee[]) => {
        this.dataSource = new MatTableDataSource(result);
        this.employees = result;
      },
      error => {
        console.error('Error:', error);
      }
    )
  }

  getEmployeePositionName(enumEmployeePosition: number): string {
    return EmployeePosition[enumEmployeePosition]
  }

  clearSearch() {
    this.value = '';
    this.getEmployee('');
  }

  onSelectedValuesChange() {
    this.getEmployee('', this.selectedValues)
  }

  deleteButtonEmployee() {
    const selectedEmployees = this.selection.selected;

    if (selectedEmployees.length > 0) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '400px',
        height: '200px',
        data: {
          titleText: "Delete Employee",
          confirmationText: "Do you really want delete selected Employees?"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          for (const employee of selectedEmployees) {
            this.employeeService.deleteEmployees(employee.shopId, employee.employeeId).subscribe(result => {
              this.getEmployee('');
            });
          }

          this.selection.clear();
        }
      });
    }
  }

  deleteEmployee(employe: Employee) {
    this.employeeService.deleteEmployees(employe.shopId, employe.employeeId).subscribe(result => {
      this.getEmployee('');
    })
  }

  updateEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      width: '400px',
      height: '650px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployee('');
    }
    )
  }

  isDeleteButtonDisabled(): boolean {
    return this.selection.isEmpty();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeId + 1}`;
  }
}
