import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addStatusToTask } from "../services/BoardService";
import { Close } from "@mui/icons-material";
interface AddStatusProps {
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
const AddStatus: React.FC<AddStatusProps> = ({ onClose }) => {
  const [status, setStatus] = React.useState("");
  const project = useSelector((state: RootState) => state.project);
  const currentBoard = project.currentBoard;
  const currentList = project.currentList;
  const currentTask = project.currentTask;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const handleAddStatus = async () => {
    if (currentBoard && currentList && currentTask) {
      await addStatusToTask(
        currentBoard.id,
        currentList.id,
        currentTask.id,
        status
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
        name="status"
        id="status"
        required
        onChange={(e) => handleSelectChange(e)}
      >
        <option value="">Select Status</option>
        <option value="to-do">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </SelectInput>
      <Button onClick={() => handleAddStatus()}>Add Status</Button>
    </Container>
  );
};

export default AddStatus;
