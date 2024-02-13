import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskemployeesBoardComponent } from './taskemployees-board.component';

describe('TaskemployeesBoardComponent', () => {
  let component: TaskemployeesBoardComponent;
  let fixture: ComponentFixture<TaskemployeesBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskemployeesBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskemployeesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
