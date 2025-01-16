import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../types/Board";
import { List } from "../types/List";
import { Task } from "../types/Task";

interface ProjectState {
  currentBoard: Board | null;
  currentList: List | null;
  currentTask: Task | null;
}
const initialState: ProjectState = {
  currentBoard: null,
  currentList: null,
  currentTask: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<Board>) {
      state.currentBoard = action.payload;
    },
    setCurrentList(state, action: PayloadAction<List>) {
      state.currentList = action.payload;
    },
    setCurrentTask(state, action: PayloadAction<Task>) {
      state.currentTask = action.payload;
    },
  },
});

export const { setCurrentBoard, setCurrentList, setCurrentTask } =
  projectSlice.actions;
export const projectReducer = projectSlice.reducer;
