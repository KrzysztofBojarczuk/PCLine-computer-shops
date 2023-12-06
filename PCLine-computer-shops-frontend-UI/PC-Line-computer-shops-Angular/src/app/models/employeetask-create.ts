import { TaskStatus } from '../enums/taskStatus';

export interface TaskemployeeCreate {
  taskCreatedDate: Date;
  title: string;
  description: string;
  timeEstiamted: number;
  taskStatus: TaskStatus;
  nameEmployee: string;
}
