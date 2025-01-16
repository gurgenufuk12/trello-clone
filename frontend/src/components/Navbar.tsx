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
  padding-left: 10px;
  padding-right: 10px;
  background-color: #221d24;
  align-items: center;
  border-right: 1px solid gray;
`;

const NavbarMenu = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.span`
  color: white;
  align-self: flex-start;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
`;

const Button = styled.button`
  width: fit-content;
  padding: 10px 20px;
  border-radius: 20px;
  height: 40px;
  border: none;
  background-color: #0077cc;
  margin-top: auto;
  margin-bottom: 10px;
`;
const HeaderText = styled.span`
  color: white;
  font-size: 16px;
  align-self: flex-start;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
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
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project);
  console.log(project);

  const handleLogout = async () => {
    try {
      await authContext?.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await getBoards();
      setBoards(response);
    } catch (error: unknown) {
      console.error("Fetch boards error", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <Container>
      <Header>Trello Clone</Header>
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
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Navbar;
