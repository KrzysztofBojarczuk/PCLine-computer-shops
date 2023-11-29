import { TaskStatus } from "../enums/taskStatus";

export interface TaskemployeeCreate {
    taskId: number;
    taskCreatedDate: Date;
    title: string;
    description: string;
    timeEstimated: number;
    taskStatus: TaskStatus;
}