import React, { useState } from "react";
import styled from "styled-components";
import { List } from "../types/List";
import { Add } from "@mui/icons-material";
import ListForm from "./ListForm";
import TaskDisplay from "./TaskDisplay";
interface BoardListProps {
  list: List;
  boardId: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-height: calc(100vh - 120px);
  background-color: #282f27;
  border-radius: 8px;
  padding: 16px;
  gap: 12px;
  border: 1px solid #2f3336;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListHeader = styled.div`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
  border-bottom: 1px solid #2f3336;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background-color: transparent;
  border: 1px solid #3f4447;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #353b34;
    border-color: #ff4757;
  }
`;

const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const BoardList: React.FC<BoardListProps> = ({ list, boardId }) => {
  const { id } = list;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };
  return (
    <Container>
      <ListHeader>{list.title}</ListHeader>
      <TaskDisplay list={list} boardId={boardId} />

      {showDropdown ? (
        <ListForm
          boardId={boardId}
          id={id}
          onClose={() => handleCloseDropdown()}
        />
      ) : (
        <Button onClick={() => setShowDropdown(true)}>
          <Add sx={{ color: "white" }} />
          <ButtonText>Add Task</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default BoardList;
