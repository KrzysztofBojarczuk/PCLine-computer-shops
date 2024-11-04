import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ShopTableComponent } from './shops/shop-table/shop-table.component';
import { AdditionalInformationsComponent } from './shops/additional-informations/additional-informations.component';
import { EmployeeListComponent } from './employee/employee-table/employee-list.component';
import { TaskemployeesBoardComponent } from './taskemployees/taskemployees-board/taskemployees-board.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'shops',
    component: ShopTableComponent,
    //canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductTableComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'additional-informations/:shopId',
    component: AdditionalInformationsComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'taskemployees',
    component: TaskemployeesBoardComponent,
    //canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
