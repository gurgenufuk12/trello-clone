import { User } from "./User";

export interface CheckListItem {
  id: string;
  title: string;
  isChecked: boolean;
  assingedTo?: string;
}

export interface CheckList {
  id: string;
  title: string;
  items: CheckListItem[];
}
export interface TaskLogs {
  logDoneBy: string;
  logDescription: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: User | null | undefined;
  assignedBy: User | null | undefined;
  taskState: "to-do" | "in-progress" | "done";
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  checklists: CheckList[];
  taskLogs: TaskLogs[];
}
