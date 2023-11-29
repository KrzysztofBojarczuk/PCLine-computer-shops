import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ShopTableComponent } from './shops/shop-table/shop-table.component';
import { AdditionalInformationsComponent } from './shops/additional-informations/additional-informations.component';
import { EmployeeListComponent } from './employee/employee-table/employee-list.component';
import { TaskemployeesBoardComponent } from './taskemployees/taskemployees-board/taskemployees-board.component';

const routes: Routes = [
  { path: '', component: ShopTableComponent },
  { path: 'shops', component: ShopTableComponent },
  { path: 'products', component: ProductTableComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'additional-informations/:shopId', component: AdditionalInformationsComponent },
  { path: 'taskemployees', component: TaskemployeesBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
