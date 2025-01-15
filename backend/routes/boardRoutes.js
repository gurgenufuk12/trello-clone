const express = require("express");

const { addBoard } = require("../controllers/boardController");
const { getBoards } = require("../controllers/boardController");
const { addListToBoardWithId } = require("../controllers/boardController");
const { getListFromBoardWithId } = require("../controllers/boardController");
const { addTaskToListWithId } = require("../controllers/boardController");
const { updateTaskDescription } = require("../controllers/boardController");
const { addCheckListToTask } = require("../controllers/boardController");
const { deleteCheckListFromTask } = require("../controllers/boardController");
const {
  addCheckListItemToCheckList,
} = require("../controllers/boardController");
const { checkItemInCheckList } = require("../controllers/boardController");
const router = express.Router();

router.post("/addBoard", addBoard);
router.get("/getBoards", getBoards);
router.post("/addListToBoardWithId/:id", addListToBoardWithId);
router.get("/getListFromBoardWithId/:id", getListFromBoardWithId);
router.post("/addTaskToListWithId/:id/:listId", addTaskToListWithId);
router.put("/updateTaskDescription/:id/:listId/:taskId", updateTaskDescription);
router.post("/addCheckListToTask/:id/:listId/:taskId", addCheckListToTask);
router.post(
  "/addCheckListItemToCheckList/:id/:listId/:taskId/:checklistId",
  addCheckListItemToCheckList
);
router.delete(
  "/deleteCheckListFromTask/:id/:listId/:taskId/:checklistId",
  deleteCheckListFromTask
);
router.put(
  "/checkItemInCheckList/:id/:listId/:taskId/:checklistId/:checklistItemId",
  checkItemInCheckList
);

module.exports = router;
