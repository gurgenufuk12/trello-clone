import React from "react";
import styled from "styled-components";
import { User } from "../types/User";

interface AvatarProps {
  user: User;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #2f3239;
  border-radius: 50%;
`;
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <Container>
      <span>{user.email[0].toUpperCase()}</span>
    </Container>
  );
};

export default Avatar;
