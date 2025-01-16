import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setCurrentList, setCurrentTask } from "../redux/projectSlice";
import { Task } from "../types/Task";
import EditTask from "./EditTask";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from "@mui/icons-material/Reorder";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { List } from "../types/List";
import TaskPriorityCard from "./TaskPriorityCard";
import TaskStatusCard from "./TaskStatusCard";

interface TaskCardProps {
  task: Task;
  list: List;
  boardId: string;
}

const Container = styled.div`
  display: flex;
  height: fit-content;
  background-color: #282f27;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    border: 1px solid white;
  }
`;
const ColumnComponent = styled.div`
  display: flex;
  flex-direction: column;
`;
const RowComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const TaskTitle = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 0.8rem;
`;
const EditTaskDisplay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const TaskCard: React.FC<TaskCardProps> = ({ task, boardId, list }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = React.useState<boolean>(false);
  const totalCheckListItems = task.checklists.reduce(
    (acc, curr) => acc + curr.items.length,
    0
  );
  const totalCheckedItems = task.checklists.reduce(
    (acc, curr) =>
      acc +
      curr.items.reduce((acc, curr) => (curr.isChecked ? acc + 1 : acc), 0),
    0
  );

  const handleCloseEditPopup = () => {
    setShowEdit(false);
  };

  return (
    <>
      <Container
        onClick={() => {
          setShowEdit(true);
          dispatch(setCurrentList(list));
          dispatch(setCurrentTask(task));
        }}
      >
        <ColumnComponent>
          <RowComponent>
            <TaskTitle>{task.title}</TaskTitle>
            <EditIcon sx={{ color: "white", width: "18px" }} />
          </RowComponent>
          <RowComponent>
            {task.description && (
              <ReorderIcon sx={{ color: "white", width: "18px" }} />
            )}
            {totalCheckListItems > 0 && (
              <RowComponent>
                <CheckBoxOutlinedIcon sx={{ color: "white", width: "18px" }} />
                <TaskTitle>
                  {totalCheckedItems}/{totalCheckListItems}
                </TaskTitle>
              </RowComponent>
            )}
            {task.taskPriority && (
              <TaskPriorityCard priority={task.taskPriority} />
            )}
            {task.taskState && <TaskStatusCard status={task.taskState} />}
          </RowComponent>
        </ColumnComponent>
      </Container>
      {showEdit && (
        <EditTaskDisplay>
          <EditTask
            boardId={boardId}
            listId={list.id}
            task={task}
            onClose={handleCloseEditPopup}
          />
        </EditTaskDisplay>
      )}
    </>
  );
};

export default TaskCard;
