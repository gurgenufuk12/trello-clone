import { Board } from "./Board";

interface BoardRole {
  boardId: string; // Unique identifier for the board
  role: "admin" | "user"; // Role specific to the board
}

// User interface definition
export interface User {
  id: string; // Unique identifier (UUID or Firebase UID)
  fullName: string; // User's full name
  email: string; // User's email address
  boards: Board[];
  boardRoles: BoardRole[]; // Array of roles for different boards
  createdAt: Date; // Account creation date
  updatedAt: Date; // Last account update date
}
