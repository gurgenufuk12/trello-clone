import React from "react";
import styled from "styled-components";
import { User } from "../types/User";

interface UserCardProps {
  user: User;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #2f3239;
  border-radius: 10px;
  padding: 10px;
`;
const Title = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
`;
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Container>
      <Title>{user.email}</Title>
    </Container>
  );
};

export default UserCard;
