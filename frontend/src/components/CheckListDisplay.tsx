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
  height: fit-content;
  background-color: transparent;
  border-radius: 10px;
  gap: 10px;
`;
const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-color: transparent;
  border-radius: 10px;
  gap: 10px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-color: transparent;
  border-radius: 10px;
  padding: 0px 20px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  display: flex;
  margin-left: auto;
  background-color: #ff4757;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  font-size: 0.8rem;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
const CheckListHeader = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;
const CheckListItem = styled.span<{ isChecked: boolean }>`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  text-decoration: ${(props) => (props.isChecked ? "line-through" : "none")};
  color: white;
  font-size: 0.8rem;
`;
const CheckBoxInput = styled.input`
  width: 16px;
  height: 16px;
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
        <>
          <OuterContainer key={checkList.id}>
            <RowContainer>
              <CheckBoxOutlinedIcon sx={{ color: "white" }} />
              <CheckListHeader>{checkList.title}</CheckListHeader>
              <Button onClick={() => handleDeleteCheckList(checkList.id)}>
                Delete
              </Button>
            </RowContainer>
            <ProgressBar
              progress={
                checkList.items.filter((item) => item.isChecked).length /
                checkList.items.length
              }
            />
            {checkList.items.map((item) => (
              <InnerContainer key={item.id}>
                <RowContainer>
                  <CheckBoxInput
                    defaultChecked={item.isChecked}
                    onClick={() =>
                      handleCheckItem(checkList.id, item.id, !item.isChecked)
                    }
                    type="checkbox"
                  />
                  <CheckListItem isChecked={item.isChecked}>
                    {item.title}
                  </CheckListItem>
                </RowContainer>
              </InnerContainer>
            ))}
          </OuterContainer>
          <AddCheckListItem
            boardId={boardId}
            listId={listId}
            taskId={taskId}
            checkListId={checkList.id}
          />
        </>
      ))}
    </Container>
  );
};

export default CheckListDisplay;
