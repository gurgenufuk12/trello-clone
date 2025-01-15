import React from "react";
import styled from "styled-components";

interface NavbarItemProps {
  icon: React.ReactNode;
  navbarTitle: string;
  active?: boolean;
  onClick: () => void;
}

const Container = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  padding: 0px 0px 0px 10px;
  gap: 10px;
  background-color: ${(props) => (props.active ? "#95a1af" : "transparent")};
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.span`
  color: white;
  font-weight: semi-bold;
  font-family: "Poppins", sans-serif;
`;
const NavbarItem: React.FC<NavbarItemProps> = ({
  icon,
  navbarTitle,
  active,
  onClick,
}) => {
  return (
    <Container active={active} onClick={onClick}>
      {icon}
      <Title>{navbarTitle}</Title>
    </Container>
  );
};

export default NavbarItem;
