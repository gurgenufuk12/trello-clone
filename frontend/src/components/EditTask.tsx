import React from "react";
import styled from "styled-components";
import AddTaskDescription from "./AddTaskDescription";
import ActionsMenu from "./ActionsMenu";
import TaskActivity from "./TaskActivity";
import { Task } from "../types/Task";
import CheckListDisplay from "./CheckListDisplay";
import TaskPriorityCard from "./TaskPriorityCard";
import TaskStatusCard from "./TaskStatusCard";
import { Close } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface EditTaskProps {
  boardId: string;
  listId: string;
  task: Task;
  onClose: () => void;
}
const Component = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 1000px;
  height: 800px;
  background-color: #323940;
  border-radius: 30px;
  padding: 20px;
  gap: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 800px;
  gap: 20px;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 10px;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 10px;
`;
const Title = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 1.5rem;
`;
const RowContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
const Text = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 1rem;
`;
const HeaderText = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
const EditTask: React.FC<EditTaskProps> = ({
  boardId,
  listId,
  task,
  onClose,
}) => {
  const [editForm, setEditForm] = React.useState<boolean>(false);
  const [showChecklist, setShowChecklist] = React.useState<boolean>(false);
  const isTaskHasDescription = task.description ? true : false;
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleOpenEditForm = () => {
    setEditForm(true);
  };
  const handleCloseEditForm = () => {
    setEditForm(false);
  };
  const handleOpenChecklist = () => {
    setShowChecklist(true);
  };

  return (
    <Component>
      <RowContainer>
        <Title>{task.title}</Title>
        <Close sx={{ color: "white", cursor: "pointer" }} onClick={onClose} />
      </RowContainer>
      <Container onClick={handleContainerClick}>
        <LeftContainer>
          <RowContainer>
            <FlexRow>
              <DescriptionIcon sx={{ color: "white" }} />
              <HeaderText>Description</HeaderText>
            </FlexRow>
            <Button onClick={() => handleOpenEditForm()}>Edit</Button>
          </RowContainer>
          {!isTaskHasDescription || editForm ? (
            <AddTaskDescription
              boardId={boardId}
              listId={listId}
              taskId={task.id}
              description={task.description}
              onClose={handleCloseEditForm}
            />
          ) : (
            <Text>{task.description}</Text>
          )}
          {(showChecklist || task.checklists.length > 0) && (
            <CheckListDisplay
              checkLists={task.checklists}
              boardId={boardId}
              listId={listId}
              taskId={task.id}
            />
          )}
          {task.taskPriority && (
            <RowContainer>
              <FlexRow>
                <PriorityHighIcon sx={{ color: "white" }} />
                <HeaderText>Priority</HeaderText>
              </FlexRow>
              <TaskPriorityCard priority={task.taskPriority} />
            </RowContainer>
          )}
          {task.taskState && (
            <RowContainer>
              <FlexRow>
                <AssignmentIcon sx={{ color: "white" }} />
                <HeaderText>Status</HeaderText>
              </FlexRow>
              <TaskStatusCard status={task.taskState} />
            </RowContainer>
          )}
          <FlexRow>
            <TimelineIcon sx={{ color: "white" }} />
            <HeaderText>Activity</HeaderText>
          </FlexRow>
          <TaskActivity task={task} />
        </LeftContainer>
        <RightContainer>
          <HeaderText>Actions</HeaderText>
          <ActionsMenu
            onCheckListClicked={handleOpenChecklist}
            boardId={boardId}
            listId={listId}
            task={task}
          />
        </RightContainer>
      </Container>
    </Component>
  );
};

export default EditTask;
