import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToShopComponent } from './add-product-to-shop.component';

describe('AddProductToShopComponent', () => {
  let component: AddProductToShopComponent;
  let fixture: ComponentFixture<AddProductToShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductToShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductToShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
