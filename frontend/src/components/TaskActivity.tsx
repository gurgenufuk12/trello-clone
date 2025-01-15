import React from "react";
import styled from "styled-components";
import { Task } from "../types/Task";

interface TaskActivityProps {
  task: Task;
}

const TaskActivity: React.FC<TaskActivityProps> = ({ task }) => {
  return <div>DAHA SONRA TASK LOGLARINI GÖSTER!!!!</div>;
};

export default TaskActivity;
