import { User } from "./User";
import { List } from "./List";

export interface Board {
  id: string;
  title: string;
  description: string;
  boardAdmin: User;
  boardUsers: User[];
  boardList: List[];
  createdAt: Date;
  updatedAt: Date;
}
