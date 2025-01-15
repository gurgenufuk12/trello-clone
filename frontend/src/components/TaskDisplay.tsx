import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";
import { List } from "../types/List";

interface TaskDisplayProps {
  list: List;
  boardId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
  gap: 5px;
`;

const TaskDisplay: React.FC<TaskDisplayProps> = ({ list, boardId }) => {
  return (
    <Container>
      {list.listTasks.map((task) => (
        <TaskCard boardId={boardId} listId={list.id} task={task} />
      ))}
    </Container>
  );
};

export default TaskDisplay;
