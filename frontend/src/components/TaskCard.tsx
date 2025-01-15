import React from "react";
import styled from "styled-components";
import { Task } from "../types/Task";
import EditTask from "./EditTask";
import EditIcon from "@mui/icons-material/Edit";
import ReorderIcon from "@mui/icons-material/Reorder";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

interface TaskCardProps {
  task: Task;
  listId: string;
  boardId: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
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
const TaskCard: React.FC<TaskCardProps> = ({ task, boardId, listId }) => {
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
      <Container onClick={() => setShowEdit(true)}>
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
          </RowComponent>
        </ColumnComponent>
      </Container>
      {showEdit && (
        <EditTaskDisplay>
          <EditTask
            boardId={boardId}
            listId={listId}
            task={task}
            onClose={handleCloseEditPopup}
          />
        </EditTaskDisplay>
      )}
    </>
  );
};

export default TaskCard;
