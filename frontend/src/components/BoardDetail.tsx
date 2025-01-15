import React, { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styled from "styled-components";
import DropdownForm from "./DropdownForm";
import { Board } from "../types/Board";
import { List } from "../types/List";
import { Add } from "@mui/icons-material";
import BoardList from "./BoardList";

interface BoardDetailProps {
  board: Board;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #221d24;
  width: 100%;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
  padding: 10px;
  width: 100%;
  height: 50px;
`;

const Title = styled.h1`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
`;

const Component = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: min-content;
  justify-items: center;
  background-color: #221d24;
  width: 100%;
  gap: 10px;

  & > * {
    margin: 0;
  }
`;

const AddListWrapper = styled.button<{ onOpen: boolean }>`
  border: none;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: fit-content;
  background-color: ${(props) => (props.onOpen ? "#282f27" : "#ff4757")};
  padding: 5px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const RowComponent = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
`;

const BoardDetail: React.FC<BoardDetailProps> = ({ board }) => {
  const [boardLists, setBoardLists] = useState<List[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "boards", board.id),
      (doc) => {
        if (doc.exists()) {
          setBoardLists(doc.data().boardList || []);
        }
      },
      (error) => {
        console.error("Error listening to board changes:", error);
      }
    );

    return () => unsubscribe();
  }, [board.id]);

  const handleCloseDropdown = () => {
    setShowForm(false);
  };

  return (
    <Container>
      <Header>
        <Title>{board.title}</Title>
      </Header>
      <Component>
        <AddListWrapper onOpen={showForm} onClick={() => setShowForm(true)}>
          {showForm ? (
            <DropdownForm board={board} onClose={handleCloseDropdown} />
          ) : (
            <RowComponent>
              <Add sx={{ color: "white" }} />
              <ButtonText>Add a list</ButtonText>
            </RowComponent>
          )}
        </AddListWrapper>
        {boardLists.map((list, index) => (
          <BoardList key={index} list={list} boardId={board.id} />
        ))}
      </Component>
    </Container>
  );
};

export default BoardDetail;
