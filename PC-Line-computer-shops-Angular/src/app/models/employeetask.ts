import { TaskStatus } from '../enums/taskStatus';

export interface Taskemployee {
  taskId: number;
  taskCreatedDate: Date;
  title: string;
  description: string;
  timeEstimated: number;
  taskStatus: TaskStatus;
  nameEmployee: string;
  files?: File[];
}
