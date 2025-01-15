import { Task } from "./Task";

export interface List {
  id: string;
  title: string;
  description: string;
  listTasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}
