import React from "react";
import styled from "styled-components";

interface TaskPriorityCardProps {
  priority: string;
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
const TaskPriorityCard: React.FC<TaskPriorityCardProps> = ({ priority }) => {
  return (
    <>
      {priority === "high" && (
        <HighPriorityContainer>
          <Text>Priority: </Text>
          <Text>High</Text>
        </HighPriorityContainer>
      )}
      {priority === "medium" && (
        <MediumPriorityContainer>
          <Text>Priority:</Text>
          <Text>Medium</Text>
        </MediumPriorityContainer>
      )}
      {priority === "low" && (
        <LowPriorityContainer>
          <Text>Priority:</Text>
          <Text>Low</Text>
        </LowPriorityContainer>
      )}
    </>
  );
};

export default TaskPriorityCard;
