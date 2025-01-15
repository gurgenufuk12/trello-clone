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
  height: fit-content;
  background-color: #323940;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 60px;
  background-color: #323940;
  color: white;
  border: none;
  font-family: "Poppins", sans-serif;
  border: 1px solid white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
`;
const RowContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 10px;P

`;
const Button = styled.button<{ isClose: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isClose ? "transparent" : "#ff4757")};
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
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
      <Input
        type="text"
        placeholder="Add a description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      ></Input>
      <RowContainer>
        <Button
          isClose={false}
          onClick={() => {
            addTaskDescription();
          }}
        >
          Save
        </Button>
        <Button isClose={true} onClick={() => onClose()}>
          Close
        </Button>
      </RowContainer>
    </Container>
  );
};
export default AddTaskDescription;
