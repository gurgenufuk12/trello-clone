import React, { useState, useContext } from "react";
import { Add, Close } from "@mui/icons-material";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { addTaskToListWithId } from "../services/BoardService";

interface ListFormProps {
  boardId: string;
  id: string;
  onClose: () => void;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 8px;
  background-color: #282f27;
  border-radius: 8px;
  border: 1px solid #3f4447;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: #1e2124;
  color: white;
  border: 1px solid #3f4447;
  border-radius: 6px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  transition: all 0.2s;

  &::placeholder {
    color: #8b949e;
  }

  &:focus {
    outline: none;
    border-color: #ff4757;
  }
`;

const RowComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #ff4757;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ff6b81;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
const ListForm: React.FC<ListFormProps> = ({ boardId, id, onClose }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userProfile;
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleAddTask = async () => {
    const newTask = {
      id: "",
      title: taskTitle,
      description: "",
      assignedTo: "",
      assignedBy: currentUser?.id,
      taskState: "to-do" as "to-do" | "in-progress" | "done",
      dueDate: new Date(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      checklists: [],
      taskLogs: [],
      taskPriority: "",
    };
    try {
      const response = await addTaskToListWithId(boardId, id, newTask);
      if (response) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <Container>
      <Input
        placeholder="Enter task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <RowComponent>
        <Button onClick={() => handleAddTask()}>
          <Add
            sx={{
              color: "white",
            }}
          />
          <ButtonText>Add Task</ButtonText>
        </Button>
        <CloseButton onClick={onClose}>
          <Close sx={{ color: "white" }} />
        </CloseButton>
      </RowComponent>
    </Container>
  );
};

export default ListForm;
