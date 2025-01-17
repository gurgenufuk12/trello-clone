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
  background-color: #101204;
  min-width: 350px;
  max-width: 350px;
  flex-shrink: 0;
  height: fit-content;
  color: #b4c0cd;
  border: 1px solid white;
  padding: 10px;
  border-radius: 20px;
  gap: 10px;
`;
const ListHeader = styled.span`
  width: fit-content;
  font-family: "Poppins", sans-serif;
  color: #b4c0cd
  font-weight: bold;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff4757;
  }
`;
const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
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
      {showDropdown && (
        <ListForm boardId={boardId} id={id} onClose={handleCloseDropdown} />
      )}
      {!showDropdown && (
        <Button onClick={() => setShowDropdown(true)}>
          <Add
            sx={{
              color: "white",
            }}
          />
          <ButtonText>Add Task</ButtonText>
        </Button>
      )}
    </Container>
  );
};

export default BoardList;
