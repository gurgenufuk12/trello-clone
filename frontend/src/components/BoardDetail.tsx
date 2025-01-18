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
  width: calc(100% - 250px);
  margin-left: 300px;
  height: 100vh;
  background-color: #1e2124;
  position: fixed;
  right: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #2f3336;
`;

const Component = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 24px;
  overflow-x: auto;
  height: calc(100vh - 64px);

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

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const InviteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #ff4757;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #ff6b81;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddListWrapper = styled.button<{ onOpen: boolean }>`
  min-width: 280px;
  height: fit-content;
  flex-shrink: 0;
  background-color: ${(props) => (props.onOpen ? "#282f27" : "#ff4757")};
  border: none;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const RowComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
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
