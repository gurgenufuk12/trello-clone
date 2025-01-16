import React from "react";
import styled from "styled-components";

interface TaskStatusCardProps {
  status: string;
}

const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  border-radius: 5px;
  padding: 2px;
`;
const HighPriorityContainer = styled(BaseContainer)`
  background-color: red;
`;
const MediumPriorityContainer = styled(BaseContainer)`
  background-color: #eb9534;
`;
const LowPriorityContainer = styled(BaseContainer)`
  background-color: green;
`;
const Text = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 0.9rem;
`;

const TaskStatusCard: React.FC<TaskStatusCardProps> = ({ status }) => {
  return (
    <>
      {status === "to-do" && (
        <HighPriorityContainer>
          <Text>Status: </Text>
          <Text>To do</Text>
        </HighPriorityContainer>
      )}
      {status === "in-progress" && (
        <MediumPriorityContainer>
          <Text>Status:</Text>
          <Text>In Progress</Text>
        </MediumPriorityContainer>
      )}
      {status === "done" && (
        <LowPriorityContainer>
          <Text>Status:</Text>
          <Text>Done</Text>
        </LowPriorityContainer>
      )}
    </>
  );
};

export default TaskStatusCard;
