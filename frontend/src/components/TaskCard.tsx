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
  background-color: #1e2124;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #2f3336;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    border-color: #ff4757;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: white;
  font-size: 14px;
`;

const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #282f27;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #353b34;
  }
`;

const TaskCount = styled.span`
  font-family: "Poppins", sans-serif;
  color: #b9bbbe;
  font-size: 12px;
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
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
        <Content>
          <Header>
            <Title>{task.title}</Title>
            <EditIcon sx={{ color: "#8b949e", width: "16px" }} />
          </Header>

          <MetadataRow>
            {task.description && (
              <MetadataItem>
                <ReorderIcon sx={{ color: "#8b949e", width: "16px" }} />
              </MetadataItem>
            )}

            {totalCheckListItems > 0 && (
              <MetadataItem>
                <CheckBoxOutlinedIcon
                  sx={{ color: "#8b949e", width: "16px" }}
                />
                <TaskCount>
                  {totalCheckedItems}/{totalCheckListItems}
                </TaskCount>
              </MetadataItem>
            )}

            {task.taskPriority && (
              <TaskPriorityCard priority={task.taskPriority} />
            )}

            {task.taskState && <TaskStatusCard status={task.taskState} />}
          </MetadataRow>
        </Content>
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
