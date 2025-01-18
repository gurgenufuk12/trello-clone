// Navbar.tsx
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoard } from "../redux/projectSlice";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";
import { getBoards } from "../services/BoardService";
import NavbarItem from "./NavbarItem";
import { Board } from "../types/Board";
import PanoramaIcon from "@mui/icons-material/Panorama";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface NavbarProps {
  activeMenu: number;
  setActiveMenu: (index: number) => void;
  selectedBoard: Board | null;
  setSelectedBoard: (board: Board | null) => void;
  boards: Board[];
  setBoards: (boards: Board[]) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  padding: 20px;
  background-color: #1e2124;
  border-right: 1px solid #2f3336;
`;

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 24px;
`;

const HeaderText = styled.h3`
  color: #8b949e;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 8px 12px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  margin-top: auto;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ff6b81;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const NavbarItems = [
  {
    title: "Boards",
    icon: (
      <PanoramaIcon
        sx={{
          color: "white",
        }}
      />
    ),
  },
  {
    title: "Members",
    icon: (
      <PeopleAltIcon
        sx={{
          color: "white",
        }}
      />
    ),
  },
];

const Navbar: React.FC<NavbarProps> = ({
  setActiveMenu,
  activeMenu,
  selectedBoard,
  setSelectedBoard,
  boards,
  setBoards,
}) => {
  const authContext = useContext(AuthContext);
  const userProfile = authContext?.userProfile;
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);

  const handleLogout = async () => {
    try {
      await authContext?.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const boards = await getBoards(userProfile?.id || "");
      setBoards(boards);
    } catch (error) {
      console.error("Fetch boards error:", error);
    }
  };
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <Container>
      <NavbarMenu>
        {NavbarItems.map((item, index) => (
          <NavbarItem
            key={index}
            icon={item.icon}
            navbarTitle={item.title}
            active={activeMenu === index}
            onClick={() => {
              setActiveMenu(index);
              setSelectedBoard(null);
            }}
          />
        ))}

        <HeaderText>Boards</HeaderText>
        {boards.map((board) => (
          <NavbarItem
            key={board.id}
            icon={<PanoramaIcon sx={{ color: "white" }} />}
            navbarTitle={board.title}
            active={selectedBoard?.id === board.id}
            onClick={() => {
              setActiveMenu(2);
              setSelectedBoard(board);
              dispatch(setCurrentBoard(board));
            }}
          />
        ))}
      </NavbarMenu>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Navbar;
