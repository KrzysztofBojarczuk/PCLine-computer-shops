import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeToShopComponent } from './add-employee-to-shop.component';

describe('AddEmployeeToShopComponent', () => {
  let component: AddEmployeeToShopComponent;
  let fixture: ComponentFixture<AddEmployeeToShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeToShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeToShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
