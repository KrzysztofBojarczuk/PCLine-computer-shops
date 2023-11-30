import { Component } from '@angular/core';
import { TaskStatus } from 'src/app/enums/taskStatus';
import { Taskemployee } from 'src/app/models/employeetask';
import { TaskemployeeService } from 'src/app/services/taskemployee.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-taskemployees-board',
  templateUrl: './taskemployees-board.component.html',
  styleUrls: ['./taskemployees-board.component.scss']
})
export class TaskemployeesBoardComponent {
  todo: Taskemployee[] = [];
  inProgress: Taskemployee[] = [];
  done: Taskemployee[] = [];

  constructor(private taskService: TaskemployeeService) {
    this.getTaskEmployee();
  }

  getTaskEmployee(searchTerm?: string) {
    this.taskService.getTaskEmployeeService(searchTerm).subscribe((result: Taskemployee[]) => {
      this.todo = result.filter(task => task.taskStatus === TaskStatus.Todo);
      this.inProgress = result.filter(task => task.taskStatus === TaskStatus.Progress);
      this.done = result.filter(task => task.taskStatus === TaskStatus.Done);
    }
    )
  }

  drop(event: CdkDragDrop<Taskemployee[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedTask = event.container.data[event.currentIndex];
      if (this.todo.includes(event.container.data[event.currentIndex])) {
        movedTask.taskStatus = TaskStatus.Todo;
      } else if (this.inProgress.includes(event.container.data[event.currentIndex])) {
        movedTask.taskStatus = TaskStatus.Progress;
      } else if (this.done.includes(event.container.data[event.currentIndex])) {
        movedTask.taskStatus = TaskStatus.Done;
      }

      // Update task status in the backend
      //this.taskService.updateTaskStatus(movedTask).subscribe(/* Handle success/error */);
    }
  }
}
