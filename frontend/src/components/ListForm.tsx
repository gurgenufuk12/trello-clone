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
  background-color: transparent;
  padding: 10px;
  gap: 20px;
`;

const Input = styled.textarea`
  display: flex;
  flex-direction: column;
  background-color: #221d24;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-family: "Poppins", sans-serif;
  resize: none;
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ff4757;
  opacity: 0.9;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const RowComponent = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
`;
const CloseButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
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
      assignedTo: currentUser,
      assignedBy: currentUser,
      taskState: "to-do" as "to-do" | "in-progress" | "done",
      dueDate: new Date(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      checklists: [],
      taskLogs: [],
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
