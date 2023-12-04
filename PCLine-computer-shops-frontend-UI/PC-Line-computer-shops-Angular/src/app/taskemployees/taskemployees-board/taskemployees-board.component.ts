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
import { clippingParents } from '@popperjs/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-taskemployees-board',
  templateUrl: './taskemployees-board.component.html',
  styleUrls: ['./taskemployees-board.component.scss']
})
export class TaskemployeesBoardComponent {
  todo: Taskemployee[] = [];
  inProgress: Taskemployee[] = [];
  done: Taskemployee[] = [];

  constructor(private taskService: TaskemployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
    console.log(event);
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

      //this.taskService.updateTaskEmployee(movedTask.taskId, movedTask).subscribe();
    }
  }

  deleteTaskEmployee(taskEmployee: Taskemployee){
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      height: '200px',
      data: {
        titleText: "Delete Taskemployee",
        confirmationText: "Do you really want delete Taskemployee?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTaskEmployee(taskEmployee.taskId).subscribe(
          result => {
            this.getTaskEmployee();
            this.snackBar.open('Taskemployee deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          error => {
            this.snackBar.open('Error deleting Taskemployee', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
