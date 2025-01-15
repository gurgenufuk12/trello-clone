import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import DisplayBoards from "../components/DisplayBoards";
import Members from "../components/Members";
import BoardDetail from "../components/BoardDetail";
import { Board } from "../types/Board";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #221d24;
`;

const Component = styled.div`
  display: flex;
  width: 100%;
`;

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = React.useState<number>(0);
  const [selectedBoard, setSelectedBoard] = React.useState<Board | null>(null);
  const [boards, setBoards] = React.useState<Board[]>([]);

  return (
    <Container>
      <Navbar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        boards={boards}
        setBoards={setBoards}
      />
      {activeMenu === 0 && !selectedBoard && (
        <Component>
          <DisplayBoards
            boards={boards}
            setSelectedBoard={setSelectedBoard}
            setActiveMenu={setActiveMenu}
          />
        </Component>
      )}
      {activeMenu === 1 && (
        <Component>
          <Members />
        </Component>
      )}
      {selectedBoard && (
        <Component>
          <BoardDetail board={selectedBoard} />
        </Component>
      )}
    </Container>
  );
};

export default Dashboard;
