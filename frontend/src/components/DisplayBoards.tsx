import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentBoard } from "../redux/projectSlice";
import BoardCard from "./BoardCard";
import AddBoard from "./AddBoard";
import { Board } from "../types/Board";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: min-content;
  justify-items: center;
  margin: 100px;
  background-color: #221d24;
  width: 100%;
  gap: 20px;

  & > * {
    margin: 0;
  }
`;
const Button = styled.button`
  width: 300px;
  height: 100px;
  background-color: #3a6472;
  border-radius: 30px;
  padding: 10px;
  border: none;
  font-family: "Poppins", sans-serif;
  color: white;
  &:hover {
    cursor: pointer;
    background-color: #2f5056;
  }
`;
const AddBoardOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

interface DisplayBoardsProps {
  boards: Board[];
  setSelectedBoard: (board: Board) => void;
  setActiveMenu: (index: number) => void;
}

const DisplayBoards: React.FC<DisplayBoardsProps> = ({
  boards,
  setSelectedBoard,
  setActiveMenu,
}) => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);
  const [addBoardFormVisible, setAddBoardFormVisible] = useState(false);

  const handleCloseAddBoardForm = () => {
    setAddBoardFormVisible(false);
  };
  return (
    <>
      <Container>
        <Button onClick={() => setAddBoardFormVisible(true)}>
          Create a new board
        </Button>
        {boards &&
          boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onClick={() => {
                setSelectedBoard(board);
                setActiveMenu(2);
                dispatch(setCurrentBoard(board));
              }}
            />
          ))}
      </Container>
      {addBoardFormVisible && (
        <AddBoardOverlay>
          <AddBoard onClick={handleCloseAddBoardForm} />
        </AddBoardOverlay>
      )}
    </>
  );
};

export default DisplayBoards;
