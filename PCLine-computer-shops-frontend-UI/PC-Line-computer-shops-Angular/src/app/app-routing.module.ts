import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ShopTableComponent } from './shops/shop-table/shop-table.component';
import { AdditionalInformationsComponent } from './shops/additional-informations/additional-informations.component';

const routes: Routes = [
  { path: '', component: ShopTableComponent },
  { path: 'shops', component: ShopTableComponent },
  { path: 'products', component: ProductTableComponent },
  { path: 'additional-informations/:shopId', component: AdditionalInformationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
