import React from "react";
import styled from "styled-components";

interface ProgressBarProps {
  progress: number;
}
const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: fit-content;
  background-color: transparent;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20px;
  background-color: #3b444c;
  border-radius: 10px;
`;
const Progress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress * 100}%;
  height: 100%;
  background-color: #ff4757;
  border-radius: 10px;
  transition: width 0.5s;

`;
const ProgressPercentage = styled.div`
  width: fit-content;
  font-family: "Poppins", sans-serif;
  font-weight: semi-bold;
  color: white;
  font-size: 0.7rem;
  padding: 5px;
`;
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <OuterContainer>
      <ProgressPercentage>{(progress * 100).toFixed(0)}%</ProgressPercentage>
      <Container>
        <Progress progress={progress} />
      </Container>
    </OuterContainer>
  );
};

export default ProgressBar;
