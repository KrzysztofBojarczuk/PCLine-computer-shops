import { Component } from '@angular/core';
import { Taskemployee } from 'src/app/models/employeetask';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';

@Component({
  selector: 'app-taskemployees-board',
  templateUrl: './taskemployees-board.component.html',
  styleUrls: ['./taskemployees-board.component.scss']
})
export class TaskemployeesBoardComponent {
  taskEmployee: Taskemployee[] = [];

  constructor(private taskService: TaskemployeeService) {
  }

  getTaskEmployee(searchTerm?: string) {
    this.taskService.getTaskEmployeeService(searchTerm).subscribe((result: Taskemployee[]) => {
      this.taskEmployee = result
    }
    )
  }
}
