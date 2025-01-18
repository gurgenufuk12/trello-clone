import axios from "axios";
import { Board } from "../types/Board";
import { List } from "../types/List";
import { Task } from "../types/Task";
import { TaskLogs } from "../types/Task";
import { CheckList, CheckListItem } from "../types/Task";

const API_URL = "http://localhost:8001/api/boards";

export const getBoards = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/getBoards/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get boards error:", error);
  }
};
export const addBoard = async (board: Board) => {
  console.log(board);

  try {
    const response = await axios.post(`${API_URL}/addBoard`, board);
    return response.data;
  } catch (error) {
    console.error("Add board error:", error);
  }
};
export const addListToBoardWithId = async (boardId: string, list: List) => {
  try {
    const response = await axios.post(
      `${API_URL}/addListToBoardWithId/${boardId}`,
      list
    );
    return response.data;
  } catch (error) {
    console.error("Add list to board error:", error);
  }
};
export const getListFromBoardWithId = async (boardId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/getListFromBoardWithId/${boardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get list from board error:", error);
  }
};
export const addTaskToListWithId = async (
  boardId: string,
  listId: string,
  task: Task
) => {
  console.log(boardId, listId, task);

  try {
    const response = await axios.post(
      `${API_URL}/addTaskToListWithId/${boardId}/${listId}`,
      task
    );
    return response;
  } catch (error) {
    console.error("Add task to list error:", error);
  }
};
export const updateTaskDescription = async (
  boardId: string,
  listId: string,
  taskId: string,
  description: string
) => {
  console.log(boardId, listId, taskId, description);

  try {
    const response = await axios.put(
      `${API_URL}/updateTaskDescription/${boardId}/${listId}/${taskId}`,
      { description }
    );
    return response.data;
  } catch (error) {
    console.error("Update task description error:", error);
  }
};
export const addCheckListToTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  checkList: CheckList
) => {
  console.log(boardId, listId, taskId, checkList);

  try {
    const response = await axios.post(
      `${API_URL}/addCheckListToTask/${boardId}/${listId}/${taskId}`,
      checkList
    );
    return response.data;
  } catch (error) {
    console.error("Add checklist to task error:", error);
  }
};
export const addCheckListItemToCheckList = async (
  boardId: string,
  listId: string,
  taskId: string,
  checkListId: string,
  item: CheckListItem
) => {
  console.log(boardId, listId, taskId, checkListId, item);

  try {
    const response = await axios.post(
      `${API_URL}/addCheckListItemToCheckList/${boardId}/${listId}/${taskId}/${checkListId}`,
      item
    );
    return response.data;
  } catch (error) {
    console.error("Add checklist item to checklist error:", error);
  }
};
export const deleteCheckListFromTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  checkListId: string
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/deleteCheckListFromTask/${boardId}/${listId}/${taskId}/${checkListId}`
    );
    return response.data;
  } catch (error) {
    console.error("Delete checklist from task error:", error);
  }
};
export const checkItemInCheckList = async (
  boardId: string,
  listId: string,
  taskId: string,
  checkListId: string,
  itemId: string,
  isChecked: boolean
) => {
  try {
    const response = await axios.put(
      `${API_URL}/checkItemInCheckList/${boardId}/${listId}/${taskId}/${checkListId}/${itemId}`,
      { itemId, isChecked }
    );
    return response.data;
  } catch (error) {
    console.error("Check item in checklist error:", error);
  }
};
export const addTaskLogToTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  log: TaskLogs
) => {
  try {
    const response = await axios.post(
      `${API_URL}/addTaskLogToTask/${boardId}/${listId}/${taskId}`,
      log
    );
    return response.data;
  } catch (error) {
    console.error("Add task log to task error:", error);
  }
};
export const addPriorityToTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  priority: string
) => {
  console.log(priority);

  try {
    const response = await axios.put(
      `${API_URL}/addPriorityToTask/${boardId}/${listId}/${taskId}`,
      { priority }
    );
    return response.data;
  } catch (error) {
    console.error("Add priority to task error:", error);
  }
};
export const addStatusToTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  status: string
) => {
  console.log(status);

  try {
    const response = await axios.put(
      `${API_URL}/addStatusToTask/${boardId}/${listId}/${taskId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Add priority to task error:", error);
  }
};
export const getBoardUsersWithBoardId = async (boardId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/getBoardUsersWithBoardId/${boardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Get board users with board id error:", error);
  }
};
export const getUsersByUserId = async (usersArray: string[]) => {
  try {
    const response = await axios.post(
      `${API_URL}/getUsersByUserId`,
      usersArray
    );
    return response.data;
  } catch (error) {
    console.error("Get users by user id error:", error);
  }
};
export const assignPersonToTask = async (
  boardId: string,
  listId: string,
  taskId: string,
  userId: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/assignPersonToTask/${boardId}/${listId}/${taskId}`,
      { userId }
    );
    return response.data;
  } catch (error) {
    console.error("Assign person to task error:", error);
  }
};
