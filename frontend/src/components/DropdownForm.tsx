import React, { useState } from "react";
import styled from "styled-components";
import { addListToBoardWithId } from "../services/BoardService";
import { Board } from "../types/Board";
import { Close } from "@mui/icons-material";

interface DropdownFormProps {
  board: Board;
  onClose: () => void;
}

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowComponent = styled.div`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  color: black;
  border: none;
  height: 40px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
`;
const ButtonText = styled.span`
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
`;
const Button = styled.button<{ closeButton: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.closeButton ? "auto" : "0")};
  background-color: ${(props) =>
    props.closeButton ? "transparent" : "#ff4757"};
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 9px;
  cursor: pointer;
`;

const ErrorText = styled.span`
  color: red;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
`;
const DropdownForm: React.FC<DropdownFormProps> = ({ board, onClose }) => {
  const { id } = board;
  const [error, setError] = useState<string | null>(null);
  const [listTitle, setListTitle] = useState<string>("");

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddListToBoard = async () => {
    if (listTitle.trim() === "") {
      setError("List title is required");
      return;
    }
    setError(null);

    const list = {
      id: "",
      title: listTitle,
      description: "",
      listTasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const response = await addListToBoardWithId(id, list);
      console.log(response);
      onClose();
      setListTitle("");
    } catch {
      setError("An error occurred while adding the list.");
    }
  };
  return (
    <Dropdown onClick={handleContainerClick}>
      <RowComponent>
        <Input
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder="Enter list title"
        />
        {error && <ErrorText>{error}</ErrorText>}
      </RowComponent>
      <RowComponent>
        <Button closeButton={false} onClick={handleAddListToBoard}>
          <ButtonText>Add</ButtonText>
        </Button>
        <Button closeButton={true} onClick={onClose}>
          <Close />
        </Button>
      </RowComponent>
    </Dropdown>
  );
};

export default DropdownForm;
