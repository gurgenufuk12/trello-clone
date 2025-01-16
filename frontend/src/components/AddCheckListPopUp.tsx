import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addCheckListToTask, addTaskLogToTask } from "../services/BoardService";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

interface AddCheckListPopUpProps {
  boardId: string;
  listId: string;
  taskId: string;
  onCheckListClicked: () => void;
  onClose: () => void;
}

const Container = styled.div`
  position: absolute;
  top: 45px;
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

const Input = styled.input`
  width: 100%;
  height: 40px;
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
  display: flex;
  margin-left: auto;
  align-items: center;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;
const AddCheckListPopUp: React.FC<AddCheckListPopUpProps> = ({
  onClose,
  boardId,
  listId,
  taskId,
  onCheckListClicked,
}) => {
  const authContext = React.useContext(AuthContext);
  const currentUser = authContext?.userProfile;
  const [checkListTitle, setCheckListTitle] = React.useState("");

  const addCheckListToTaskHandler = async () => {
    const newCheckList = {
      id: "",
      title: checkListTitle,
      items: [],
    };
    const taskLog = {
      id: "",
      createdAt: new Date(),
      logDoneBy: currentUser?.email,
      logDescription: `${currentUser?.email} added checklist ${checkListTitle}`,
    };
    if (checkListTitle) {
      await addCheckListToTask(boardId, listId, taskId, newCheckList);
      await addTaskLogToTask(boardId, listId, taskId, taskLog);
      onCheckListClicked();
      onClose();
    }
  };
  return (
    <Container>
      <Close
        sx={{ color: "white", cursor: "pointer", marginLeft: "auto" }}
        onClick={onClose}
      />

      <Input
        placeholder="Add Checklist"
        value={checkListTitle}
        onChange={(e) => setCheckListTitle(e.target.value)}
      />

      <Button onClick={() => addCheckListToTaskHandler()}>Add</Button>
    </Container>
  );
};

export default AddCheckListPopUp;
