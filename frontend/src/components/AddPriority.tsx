import React, { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";
import { RootState } from "../redux/store";
import { addPriorityToTask, addTaskLogToTask } from "../services/BoardService";
import { Close } from "@mui/icons-material";
interface AddPriorityProps {
  onClose: () => void;
}
const Container = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 280px;
  background-color: #1e2124;
  border-radius: 8px;
  padding: 16px;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid #2f3336;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled.h3`
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  margin: 0;
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 12px;
  background-color: #282f27;
  color: #ffffff;
  border: 1px solid #3f4447;
  border-radius: 6px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #ff4757;
  }

  option {
    background-color: #1e2124;
    color: #ffffff;
    padding: 8px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: auto;

  &:hover {
    background-color: #ff6b81;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffffff;
  }
`;
const AddPriority: React.FC<AddPriorityProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userProfile;
  const [priority, setPriority] = React.useState("");
  const project = useSelector((state: RootState) => state.project);
  const currentBoard = project.currentBoard;
  const currentList = project.currentList;
  const currentTask = project.currentTask;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };
  const handleAddPriority = async () => {
    if (currentBoard && currentList && currentTask) {
      await addPriorityToTask(
        currentBoard.id,
        currentList.id,
        currentTask.id,
        priority
      );
      const taskLog = {
        id: "",
        createdAt: new Date(),
        logDoneBy: currentUser?.email,
        logDescription: `${currentUser?.email} changed the priority to  ${priority}`,
      };
      await addTaskLogToTask(
        currentBoard.id,
        currentList.id,
        currentTask.id,
        taskLog
      );
      onClose();
    }
  };
  return (
    <Container>
      <Header>
        <Title>Set Priority</Title>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </Header>
      <SelectInput
        name="priority"
        id="priority"
        required
        onChange={(e) => handleSelectChange(e)}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </SelectInput>
      <Button onClick={() => handleAddPriority()}>Save Priority</Button>
    </Container>
  );
};

export default AddPriority;
