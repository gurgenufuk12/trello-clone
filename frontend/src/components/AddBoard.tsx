import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addBoard } from "../services/BoardService";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

const FormContainer = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 400px;
  height: 300px;
  padding: 20px;
  padding-top: 50px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #4b9cd3;
    outline: none;
  }
`;

const Button = styled.button<{ close?: boolean }>`
  background-color: ${(props) => (props.close ? "white" : " #4b9cd3;")};
  width: ${(props) => (props.close ? "30px" : "100%")};
  color: white;
  padding: ${(props) => (props.close ? "0" : "10px 20px")};
  position: ${(props) => (props.close ? "absolute" : "static")};
  top: ${(props) => (props.close ? "10px" : "auto")};
  right: ${(props) => (props.close ? "10px" : "auto")};
  font-size: 16px;
  border: none;
  border-radius: ${(props) => (props.close ? "50%" : "4px")};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.close ? "gray" : "#0077cc")};
  }
`;
interface AddBoardProps {
  onClick: () => void;
}
const AddBoard: React.FC<AddBoardProps> = ({ onClick }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.userProfile;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }

    const newBoard = {
      id: "",
      title,
      description,
      boardAdmin: currentUser,
      boardUsers: [],
      boardList: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const response = await addBoard(newBoard);
      window.location.reload();
    } catch (error) {
      window.alert("Failed to create board: " + error); //change later
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Button close={true} onClick={onClick}>
        <Close sx={{ color: "black" }} />
      </Button>
      <FormGroup>
        <Label htmlFor="title">Board Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </FormGroup>
      <Button type="submit">Create Board</Button>
    </FormContainer>
  );
};

export default AddBoard;
