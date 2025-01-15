import React from "react";
import { Board } from "../types/Board";
import styled from "styled-components";

interface BoardCardProps {
  board: Board;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  max-width: 300px;
  background-color: #63525d;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;

  &:hover {
    background-color: #4e3e46;
    cursor: pointer;
  }
`;

const Title = styled.span`
  font-weight: semibold;
  font-family: "Poppins", sans-serif;
`;

const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Title>{board.title}</Title>
    </Container>
  );
};

export default BoardCard;
