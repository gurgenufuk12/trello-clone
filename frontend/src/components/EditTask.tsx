import React, { useEffect } from "react";
import styled from "styled-components";
import {
  getBoardUsersWithBoardId,
  getUsersByUserId,
} from "../services/BoardService";
import AddTaskDescription from "./AddTaskDescription";
import ActionsMenu from "./ActionsMenu";
import TaskActivity from "./TaskActivity";
import Avatar from "./Avatar";
import { Task } from "../types/Task";
import CheckListDisplay from "./CheckListDisplay";
import TaskPriorityCard from "./TaskPriorityCard";
import TaskStatusCard from "./TaskStatusCard";
import { Close } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { User } from "../types/User";

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
  width: 900px;
  height: 700px;
  background-color: #1e2124;
  border-radius: 12px;
  padding: 24px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  display: flex;
  gap: 24px;
  height: calc(100% - 60px);
`;

const LeftContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid #2f3336;
  padding-left: 24px;
  height: 100%;
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  font-size: 20px;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #2f3336;
`;

const HeaderText = styled.h2`
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  background-color: #2f3336;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3f4447;
  }
`;

const Text = styled.p`
  font-family: "Poppins", sans-serif;
  color: #b9bbbe;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const UsersContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ffffff;
  }
`;
const EditTask: React.FC<EditTaskProps> = ({
  boardId,
  listId,
  task,
  onClose,
}) => {
  const [boardUsers, setBoardUsers] = React.useState<User[]>([]);
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
  const fetchBoardUsers = async () => {
    try {
      const userData = await getBoardUsersWithBoardId(boardId);
      const userArray = await getUsersByUserId(userData);
      setBoardUsers(userArray);
    } catch (error) {
      console.error("Fetch board users error:", error);
    }
  };
  useEffect(() => {
    fetchBoardUsers();
  }, []);
  console.log("EditTask.tsx: boardUsers", boardUsers);
  console.log(task.assignedTo);

  return (
    <Component onClick={handleContainerClick}>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
      <Title>{task.title}</Title>

      <Container>
        <LeftContainer>
          {boardUsers.length > 0 && (
            <Section>
              <HeaderText>Assigned Members</HeaderText>
              <UsersContainer>
                {task.assignedTo && (
                  <Avatar key={task.assignedTo.id} user={task.assignedTo} />
                )}
              </UsersContainer>
            </Section>
          )}

          <Section>
            <SectionHeader>
              <HeaderText>
                <DescriptionIcon /> Description
              </HeaderText>
              <Button onClick={handleOpenEditForm}>Edit</Button>
            </SectionHeader>
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
          </Section>

          {(showChecklist || task.checklists.length > 0) && (
            <Section>
              <HeaderText>Checklist</HeaderText>
              <CheckListDisplay
                checkLists={task.checklists}
                boardId={boardId}
                listId={listId}
                taskId={task.id}
              />
            </Section>
          )}

          {task.taskPriority && (
            <Section>
              <SectionHeader>
                <HeaderText>
                  <PriorityHighIcon /> Priority
                </HeaderText>
                <TaskPriorityCard priority={task.taskPriority} />
              </SectionHeader>
            </Section>
          )}

          {task.taskState && (
            <Section>
              <SectionHeader>
                <HeaderText>
                  <AssignmentIcon /> Status
                </HeaderText>
                <TaskStatusCard status={task.taskState} />
              </SectionHeader>
            </Section>
          )}
          {task.assignedTo && (
            <Section>
              <SectionHeader>
                <HeaderText>
                  <AssignmentIndIcon /> Assinged to
                </HeaderText>
                <Text>{task.assignedTo.email}</Text>
              </SectionHeader>
            </Section>
          )}
          <Section>
            <HeaderText>
              <TimelineIcon /> Activity
            </HeaderText>
            <TaskActivity task={task} />
          </Section>
        </LeftContainer>

        <RightContainer>
          <HeaderText>Actions</HeaderText>
          <ActionsMenu
            onCheckListClicked={handleOpenChecklist}
            boardId={boardId}
            listId={listId}
            task={task}
            boardUsers={boardUsers}
          />
        </RightContainer>
      </Container>
    </Component>
  );
};

export default EditTask;
