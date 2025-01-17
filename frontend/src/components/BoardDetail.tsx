import React, { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styled from "styled-components";
import DropdownForm from "./DropdownForm";
import { Board } from "../types/Board";
import { List } from "../types/List";
import { Add } from "@mui/icons-material";
import BoardList from "./BoardList";
import InviteModal from "./InviteModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface BoardDetailProps {
  board: Board;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px); // 300px is navbar width
  margin-left: 300px; // Match navbar width
  height: 100vh;
  background-color: #221d24;
  position: fixed;
  right: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  height: 50px;
`;

const Component = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
  min-height: calc(100vh - 50px);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background: #ff4757;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff6b81;
  }
`;
const AddListWrapper = styled.button<{ onOpen: boolean }>`
  min-width: 250px;
  height: fit-content;
  flex-shrink: 0;
  background-color: ${(props) => (props.onOpen ? "#282f27" : "#ff4757")};
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
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
  const [showInviteModal, setShowInviteModal] = useState(false);

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
        <HeaderActions>
          <InviteButton onClick={() => setShowInviteModal(true)}>
            <PersonAddIcon />
            Invite
          </InviteButton>
        </HeaderActions>
      </Header>
      {showInviteModal && (
        <InviteModal
          boardId={board.id}
          onClose={() => setShowInviteModal(false)}
        />
      )}
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
