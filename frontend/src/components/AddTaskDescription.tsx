import React from "react";
import styled from "styled-components";
import { updateTaskDescription } from "../services/BoardService";

interface AddTaskDescriptionProps {
  boardId: string;
  listId: string;
  taskId: string;
  description: string;
  onClose: () => void;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #1e2124;
  border-radius: 8px;
  padding: 16px;
  gap: 12px;
  border: 1px solid #2f3336;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background-color: #282f27;
  color: #ffffff;
  border: 1px solid #3f4447;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  resize: vertical;
  transition: border-color 0.2s;

  &::placeholder {
    color: #8b949e;
  }

  &:focus {
    outline: none;
    border-color: #ff4757;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const Button = styled.button<{ isClose?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: ${(props) => (props.isClose ? "#282f27" : "#ff4757")};
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  border: ${(props) => (props.isClose ? "1px solid #3f4447" : "none")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.isClose ? "#353b34" : "#ff6b81")};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const AddTaskDescription: React.FC<AddTaskDescriptionProps> = ({
  boardId,
  listId,
  taskId,
  description,
  onClose,
}) => {
  const [taskDescription, setTaskDescription] =
    React.useState<string>(description);
  const addTaskDescription = async () => {
    try {
      const response = await updateTaskDescription(
        boardId,
        listId,
        taskId,
        taskDescription
      );
      console.log(response);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <TextArea
        placeholder="Add a more detailed description..."
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={addTaskDescription}>Save</Button>
        <Button isClose onClick={onClose}>
          Cancel
        </Button>
      </ButtonContainer>
    </Container>
  );
};
export default AddTaskDescription;
