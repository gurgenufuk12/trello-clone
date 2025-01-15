import React from "react";
import styled from "styled-components";
import { addCheckListItemToCheckList } from "../services/BoardService";

interface AddCheckListItemProps {
  boardId: string;
  listId: string;
  taskId: string;
  checkListId: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: #2f3239;
  color: white;
  border: none;
  font-family: "Poppins", sans-serif;
  border: 1px solid white;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  border: none;
`;
const Button = styled.button`
  display: flex;
  width: fit-content;
  align-items: center;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
const RowContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const AddCheckListItem: React.FC<AddCheckListItemProps> = ({
  boardId,
  listId,
  taskId,
  checkListId,
}) => {
  const [checkListItemTitle, setCheckListItemTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const addCheckListToTaskHandler = async () => {
    const newItem = {
      id: "",
      title: checkListItemTitle,
      isChecked: false,
      assingedTo: "",
    };
    if (checkListItemTitle) {
      await addCheckListItemToCheckList(
        boardId,
        listId,
        taskId,
        checkListId,
        newItem
      );
      setCheckListItemTitle("");
      setOpen(false);
    }
  };

  return (
    <Container>
      {open && (
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter checklist item title"
            value={checkListItemTitle}
            onChange={(e) => setCheckListItemTitle(e.target.value)}
          />
          <RowContainer>
            <Button onClick={() => addCheckListToTaskHandler()}>Add</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </RowContainer>
        </InputContainer>
      )}
      {!open && (
        <Button onClick={() => setOpen(true)}>Add Checklist Item</Button>
      )}
    </Container>
  );
};

export default AddCheckListItem;
