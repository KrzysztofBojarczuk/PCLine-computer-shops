import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShopTableComponent } from './shops/shop-table/shop-table.component';
import { ShopFormComponent } from './shops/shop-form/shop-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { ShopUpdateComponent } from './shops/shop-update/shop-update.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdditionalInformationsComponent } from './shops/additional-informations/additional-informations.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavBarComponent } from './nav-bar/nav-bar.component';;
import { AdressFormComponent } from './shops/adress-form/adress-form.component';
import { MatBadgeModule } from '@angular/material/badge';
import { JwtModule } from "@auth0/angular-jwt";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    ShopTableComponent,
    ShopFormComponent,
    ShopUpdateComponent,
    ProductTableComponent,
    ProductFormComponent,
    ProductUpdateComponent,
    ProductCardComponent,
    AdditionalInformationsComponent,
    NavBarComponent,
    AdressFormComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"], // Tu dodaj domeny, które mają dostęp
        disallowedRoutes: ["example.com/api/auth/login"], // Tu dodaj ścieżki, które nie wymagają tokena
      },
    }),
    MatBadgeModule,
    NgIf,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    NgbModule,
    MatTableModule,
    NgFor,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("access_token");
}