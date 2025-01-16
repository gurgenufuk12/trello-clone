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
  width: 250px;
  height: 200px;
  background-color: #2f3239;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
`;
const SelectInput = styled.select`
  width: 100%;
  height: 45px;
  background-color: #323940;
  color: white;
  border: none;
  font-family: "Poppins", sans-serif;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  border: none;
`;
const Button = styled.button`
  width: fit-content;
  margin-left: auto;
  display: flex;
  align-items: center;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
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
      <Close
        sx={{ color: "white", cursor: "pointer", marginLeft: "auto" }}
        onClick={onClose}
      />
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
      <Button onClick={() => handleAddPriority()}>Add Priority</Button>
    </Container>
  );
};

export default AddPriority;
