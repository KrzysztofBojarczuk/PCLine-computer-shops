import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  numberOfProducts: number = 0;
  numberOEmployee: number = 0;

  constructor(private productService: ProductService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getNumberOfProducts();
    this.getNumberOfEmployee();
  }

  getNumberOfEmployee() {
    this.employeeService.getNumberOfEmployee().subscribe(
      (result) => {
        this.numberOEmployee = result
      },
      (error) => {
        console.error('Error fetching number of products:', error);
      }
    )
  }

  getNumberOfProducts() {
    this.productService.getNumberOfProducts().subscribe(
      (result) => {
        this.numberOfProducts = result;
      },
      (error) => {
        console.error('Error fetching number of products:', error);
      }
    );
  }
}
