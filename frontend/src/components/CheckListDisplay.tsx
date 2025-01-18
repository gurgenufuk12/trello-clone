import React from "react";
import styled from "styled-components";
import {
  deleteCheckListFromTask,
  checkItemInCheckList,
} from "../services/BoardService";
import { CheckList } from "../types/Task";
import AddCheckListItem from "./AddCheckListItem";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ProgressBar from "./ProgressBar";

interface CheckListDisplayProps {
  boardId: string;
  listId: string;
  taskId: string;
  checkLists: CheckList[];
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  background-color: #282f27;
  border-radius: 8px;
  padding: 16px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.2s;

  &:hover {
    background-color: #ff6b81;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.span`
  font-family: "Poppins", sans-serif;
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #353b34;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #ff4757;
`;

const ItemText = styled.span<{ isChecked: boolean }>`
  font-family: "Poppins", sans-serif;
  color: ${(props) => (props.isChecked ? "#8b949e" : "white")};
  font-size: 14px;
  text-decoration: ${(props) => (props.isChecked ? "line-through" : "none")};
  transition: all 0.2s;
`;
const CheckListDisplay: React.FC<CheckListDisplayProps> = ({
  boardId,
  listId,
  taskId,
  checkLists,
}) => {
  const handleDeleteCheckList = async (checkListId: string) => {
    try {
      const response = await deleteCheckListFromTask(
        boardId,
        listId,
        taskId,
        checkListId
      );
      console.log(response);
    } catch (error) {
      console.error("Delete check list error:", error);
    }
  };
  const handleCheckItem = async (
    checkListId: string,
    itemId: string,
    isChecked: boolean
  ) => {
    try {
      await checkItemInCheckList(
        boardId,
        listId,
        taskId,
        checkListId,
        itemId,
        isChecked
      );
    } catch (error) {
      console.error("Check item error:", error);
    }
  };

  return (
    <Container>
      {checkLists.map((checkList) => (
        <React.Fragment key={checkList.id}>
          <CheckListContainer>
            <Header>
              <CheckBoxOutlinedIcon sx={{ color: "white" }} />
              <Title>{checkList.title}</Title>
              <DeleteButton onClick={() => handleDeleteCheckList(checkList.id)}>
                Delete
              </DeleteButton>
            </Header>

            <ProgressBar
              progress={
                checkList.items.filter((item) => item.isChecked).length /
                checkList.items.length
              }
            />

            <ItemsContainer>
              {checkList.items.map((item) => (
                <CheckItem key={item.id}>
                  <Checkbox
                    type="checkbox"
                    defaultChecked={item.isChecked}
                    onChange={() =>
                      handleCheckItem(checkList.id, item.id, !item.isChecked)
                    }
                  />
                  <ItemText isChecked={item.isChecked}>{item.title}</ItemText>
                </CheckItem>
              ))}
            </ItemsContainer>
          </CheckListContainer>

          <AddCheckListItem
            boardId={boardId}
            listId={listId}
            taskId={taskId}
            checkListId={checkList.id}
          />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default CheckListDisplay;
