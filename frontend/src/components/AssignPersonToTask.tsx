import React from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import UserCard from "./UserCard";
import { User } from "../types/User";
import { assignPersonToTask, addTaskLogToTask } from "../services/BoardService";
import { Close } from "@mui/icons-material";

interface AssignPersonToTaskProps {
  boardId: string;
  listId: string;
  taskId: string;
  boardUsers: User[];
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
const AssignPersonToTask: React.FC<AssignPersonToTaskProps> = ({
  boardId,
  listId,
  taskId,
  boardUsers,
  onClose,
}) => {
  const authContext = React.useContext(AuthContext);
  const currentUser = authContext?.userProfile;
  const [selectedUser, setSelectedUser] = React.useState("");
  const handleAssignUserToTask = async () => {
    try {
      await assignPersonToTask(boardId, listId, taskId, selectedUser);
      const taskLog = {
        id: "",
        createdAt: new Date(),
        logDoneBy: currentUser?.email,
        logDescription: `${currentUser?.email} assigned ${selectedUser} to this task`,
      };
      await addTaskLogToTask(boardId, listId, taskId, taskLog);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Close
        sx={{ color: "white", cursor: "pointer", marginLeft: "auto" }}
        onClick={onClose}
      />
      <SelectInput
        name="users"
        id="users"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {boardUsers.map((user) => (
          <option key={user.id} value={user.id}>
            <UserCard user={user} />
          </option>
        ))}
      </SelectInput>
      <Button onClick={() => handleAssignUserToTask()}>Assign</Button>
    </Container>
  );
};

export default AssignPersonToTask;
