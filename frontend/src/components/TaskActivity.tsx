import React from "react";
import styled from "styled-components";
import { Task } from "../types/Task";

interface TaskActivityProps {
  task: Task;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 100%;
  padding: 0px 35px;
  gap: 5px;
`;
const TaskActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
const TaskActivityDescription = styled.span`
  color: white;
  font-weight: semi-bold;
  font-family: "Poppins", sans-serif;
`;
const TaskActivityTime = styled.span`
  color: gray;
  font-weight: semi-bold;
  font-family: "Poppins", sans-serif;
`;
const TaskActivity: React.FC<TaskActivityProps> = ({ task }) => {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);

    const months = [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <Container>
      {task.taskLogs.map((log, idx) => (
        <TaskActivityContainer key={idx}>
          <TaskActivityDescription>
            {log.logDescription}
          </TaskActivityDescription>
          <TaskActivityTime>{formatDate(log.createdAt)}</TaskActivityTime>
        </TaskActivityContainer>
      ))}
    </Container>
  );
};

export default TaskActivity;
