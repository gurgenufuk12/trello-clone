const firebase = require("../db");
const Board = require("../models/Board");
const admin = require("firebase-admin");
const db = firebase.collection("boards");
const { v4: uuidv4 } = require("uuid");
const addBoard = async (req, res, next) => {
  try {
    const {
      title,
      description,
      boardAdmin,
      boardUsers,
      boardList,
      createdAt,
      updatedAt,
    } = req.body;

    const boardRef = db.doc();
    await boardRef.set({
      id: boardRef.id,
      title,
      description,
      boardAdmin,
      boardUsers,
      boardList,
      createdAt,
      updatedAt,
    });
    res.status(201).send("Product added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getBoards = async (req, res, next) => {
  // get boards if board.boardUsers contains userId or board.boardAdmin.id === userId
  try {
    const userId = req.params.userId;
    const boards = [];
    const boardRef = await db.get();
    boardRef.forEach((doc) => {
      const board = doc.data();
      if (board.boardUsers.includes(userId) || board.boardAdmin.id === userId) {
        boards.push(board);
      }
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addListToBoardWithId = async (req, res, next) => {
  try {
    const { title, description, listTasks, createdAt, updatedAt } = req.body;

    const boardId = req.params.id;
    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const newList = {
        id: uuidv4(),
        title,
        description,
        listTasks,
        createdAt,
        updatedAt,
      };

      boardList.push(newList);
      await boardRef.update({ boardList });
      res.status(200).send("List added successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getListFromBoardWithId = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      res.status(200).json(boardList);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addTaskToListWithId = async (req, res, next) => {
  try {
    const {
      title,
      description,
      assignedTo,
      assignedBy,
      taskState,
      dueDate,
      completed,
      createdAt,
      updatedAt,
      checklists,
      taskLogs,
      taskPriority,
    } = req.body;

    const boardId = req.params.id;
    const listId = req.params.listId;
    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const newTask = {
          id: uuidv4(),
          title,
          description,
          assignedTo,
          assignedBy,
          taskState,
          dueDate,
          completed,
          createdAt,
          updatedAt,
          checklists,
          taskLogs,
          taskPriority,
        };
        listTasks.push(newTask);
        await boardRef.update({ boardList });
        res.status(200).send("Task added successfully");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateTaskDescription = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { description } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          task.description = description;
          await boardRef.update({ boardList });
          await res.status(200).send("Task description updated successfully");
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addCheckListToTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { title, items } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          const checklists = task.checklists;
          const newChecklist = {
            id: uuidv4(),
            title,
            items,
          };
          checklists.push(newChecklist);
          await boardRef.update({ boardList });
          res.status(200).send("Checklist added successfully");
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addCheckListItemToCheckList = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const checklistId = req.params.checklistId;
    const { title, isChecked } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          const checklists = task.checklists;
          const checklist = checklists.find(
            (checklist) => checklist.id === checklistId
          );

          if (!checklist) {
            res.status(404).send("Checklist not found");
          } else {
            const items = checklist.items;
            const newItem = {
              id: uuidv4(),
              assignedTo: " ",
              title,
              isChecked,
            };
            items.push(newItem);
            await boardRef.update({ boardList });
            res.status(200).send("Checklist item added successfully");
          }
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteCheckListFromTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const checklistId = req.params.checklistId;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          const checklists = task.checklists;
          const checklist = checklists.find(
            (checklist) => checklist.id === checklistId
          );

          if (!checklist) {
            res.status(404).send("Checklist not found");
          } else {
            // delete checkList
            const index = checklists.indexOf(checklist);
            if (index > -1) {
              checklists.splice(index, 1);
            }

            await boardRef.update({ boardList });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const checkItemInCheckList = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const checklistId = req.params.checklistId;
    const itemId = req.body.itemId;
    const isChecked = req.body.isChecked;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          const checklists = task.checklists;
          const checklist = checklists.find(
            (checklist) => checklist.id === checklistId
          );

          if (!checklist) {
            res.status(404).send("Checklist not found");
          } else {
            const items = checklist.items;
            const item = items.find((item) => item.id === itemId);

            if (!item) {
              res.status(404).send("Item not found");
            } else {
              item.isChecked = isChecked;
              await boardRef.update({ boardList });
              res.status(200).send("Item checked successfully");
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addTaskLogToTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { createdAt, logDoneBy, logDescription } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          const taskLogs = task.taskLogs;
          const newLog = {
            id: uuidv4(),
            createdAt,
            logDoneBy,
            logDescription,
          };
          taskLogs.push(newLog);
          await boardRef.update({ boardList });
          res.status(200).send("Task log added successfully");
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addPriorityToTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { priority } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          task.taskPriority = priority;
          await boardRef.update({ boardList });
          res.status(200).send("Task priority added successfully");
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addStatusToTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { status } = req.body;

    const boardRef = db.doc(boardId);
    const board = await boardRef.get();
    if (!board.exists) {
      res.status(404).send("Board not found");
    } else {
      const boardData = board.data();
      const boardList = boardData.boardList;
      const list = boardList.find((list) => list.id === listId);
      if (!list) {
        res.status(404).send("List not found");
      } else {
        const listTasks = list.listTasks;
        const task = listTasks.find((task) => task.id === taskId);

        if (!task) {
          res.status(404).send("Task not found");
        } else {
          task.taskState = status;
          await boardRef.update({ boardList });
          res.status(200).send("Task status added successfully");
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addBoard,
  getBoards,
  addListToBoardWithId,
  getListFromBoardWithId,
  addTaskToListWithId,
  updateTaskDescription,
  addCheckListToTask,
  addCheckListItemToCheckList,
  deleteCheckListFromTask,
  checkItemInCheckList,
  addTaskLogToTask,
  addPriorityToTask,
  addStatusToTask,
};
