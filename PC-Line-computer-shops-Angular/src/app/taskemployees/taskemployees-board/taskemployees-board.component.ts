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
import { TaskemployeesFormComponent } from '../taskemployees-form/taskemployees-form.component';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { TaskemployeesUpdateComponent } from '../taskemployees-update/taskemployees-update.component';
import { TaskFiles } from 'src/app/models/task-files';

@Component({
  selector: 'app-taskemployees-board',
  templateUrl: './taskemployees-board.component.html',
  styleUrls: ['./taskemployees-board.component.scss'],
})
export class TaskemployeesBoardComponent {
  todo: Taskemployee[] = [];
  inProgress: Taskemployee[] = [];
  done: Taskemployee[] = [];
  taskFilesMap: { [taskId: number]: TaskFiles[] } = {};
  value: string = '';

  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskemployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getTaskEmployee('');
  }

  clearSearch() {
    this.value = '';
    this.getTaskEmployee('');
  }

  getTaskEmployee(searchTerm?: string) {
    this.taskService
      .getTaskEmployeeService(searchTerm)
      .subscribe((result: Taskemployee[]) => {
        result.forEach((task) => {
          this.getTaskFilesForTask(task.taskId);
        });

        this.todo = result.filter(
          (task) => task.taskStatus === TaskStatus.Todo
        );
        this.inProgress = result.filter(
          (task) => task.taskStatus === TaskStatus.Progress
        );
        this.done = result.filter(
          (task) => task.taskStatus === TaskStatus.Done
        );
      });
  }

  drop(event: CdkDragDrop<Taskemployee[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedTask = event.container.data[event.currentIndex];

      switch (event.container.id) {
        case 'inProgressList':
          movedTask.taskStatus = TaskStatus.Progress;
          break;
        case 'doneList':
          movedTask.taskStatus = TaskStatus.Done;
          break;
        case 'todoList':
          movedTask.taskStatus = TaskStatus.Todo;
          break;
      }

      this.taskService
        .updateTaskEmployee(movedTask.taskId, movedTask)
        .subscribe();
    }
  }

  updateTaskEmployee(taskEmployee: Taskemployee) {
    const dialogRef = this.dialog.open(TaskemployeesUpdateComponent, {
      width: '400px',
      height: '800px',
      data: taskEmployee,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTaskEmployee();
    });
  }

  deleteTaskEmployee(taskEmployee: Taskemployee) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      height: '200px',
      data: {
        titleText: 'Delete Taskemployee',
        confirmationText: 'Do you really want delete Taskemployee?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTaskEmployee(taskEmployee.taskId).subscribe(
          (result) => {
            this.getTaskEmployee();
            this.snackBar.open('Taskemployee deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.snackBar.open('Error deleting Taskemployee', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  createTaskEmployee() {
    const dialogRef = this.dialog.open(TaskemployeesFormComponent, {
      width: '400px',
      height: '800px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTaskEmployee('');
    });
  }

  getTaskFilesForTask(taskId: number) {
    this.taskService
      .getTaskFilesByEmployeeId(taskId)
      .subscribe((files: TaskFiles[]) => {
        this.taskFilesMap[taskId] = files;
      });
  }

  downloadFile(fileContent: string, fileName: string) {
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;base64,' + fileContent);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  deleteFile(taskEmployeeId: number, fileId: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      height: '200px',
      data: {
        titleText: 'Delete File',
        confirmationText: 'Do you really want delete File?',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.taskService.deleteFileService(taskEmployeeId, fileId).subscribe(
          (result) => {
            this.snackBar.open('File deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.snackBar.open('Error deleting file', 'Close', {
              duration: 3000,
            });
          }
        );
        this.getTaskEmployee();
      }
    });
  }
}
