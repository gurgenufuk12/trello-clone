import React from "react";
import styled from "styled-components";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddCheckListPopUp from "./AddCheckListPopUp";
interface ActionsMenuProps {
  boardId: string;
  listId: string;
  taskId: string;
  onCheckListClicked: () => void;
}
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: transparent;
`;
const ActionMenuItem = styled.button`
  display: flex;
  flex-direction: row;
  background-color: #3b444c;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #323940;
  }
`;
const ActionMenuItemText = styled.span`
  color: white;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
`;
const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onCheckListClicked,
  boardId,
  listId,
  taskId,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Container>
      <ActionMenuItem onClick={() => setOpen(true)}>
        <ChecklistIcon sx={{ color: "white" }} />
        <ActionMenuItemText>Add Checklist</ActionMenuItemText>
      </ActionMenuItem>
      {open && (
        <AddCheckListPopUp
          boardId={boardId}
          listId={listId}
          taskId={taskId}
          onClose={() => setOpen(false)}
          onCheckListClicked={onCheckListClicked}
        />
      )}
    </Container>
  );
};

export default ActionsMenu;
