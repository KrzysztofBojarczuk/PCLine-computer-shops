import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInformationsComponent } from './additional-informations.component';

describe('AdditionalInformationsComponent', () => {
  let component: AdditionalInformationsComponent;
  let fixture: ComponentFixture<AdditionalInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
