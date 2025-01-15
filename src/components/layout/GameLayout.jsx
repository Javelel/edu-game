import React from "react";
import { Box } from "@mui/material";
import TaskStagesGrid from "./TaskStagesGrid";
import UnexpectedTasksGrid from "./UnexpectedTasksGrid";
import GameStats from "./GameStats";
import ProblemsList from "./ProblemsList";

/**
 * Layout dwóch kolumn:
 * - Lewa kolumna: TaskStagesGrid i UnexpectedTasksGrid
 * - Prawa kolumna: GameStats i ProblemsList
 */
const GameLayout = ({
  columns,
  tasks,
  solvedTasks,
  selectedTask,
  unexpectedTasks,
  dynamicProblems,
  solvedProblems,
  selectedProblem,
  onSelectProblem,
  budget,
  time,
  customerDissatisfaction,
}) => {
  return (
    <Box display="flex" flexGrow={1} mb={6} style={{ overflowY: "auto" }}>
      {/* Lewa kolumna: Zadania */}
      <Box flex={2} mr={2}>
        <TaskStagesGrid
          columns={columns}
          tasks={tasks}
          solvedTasks={solvedTasks}
          selectedTask={selectedTask}
        />
        <UnexpectedTasksGrid
          columns={columns}
          unexpectedTasks={unexpectedTasks}
          solvedTasks={solvedTasks}
          selectedTask={selectedTask}
        />
      </Box>

      {/* Prawa kolumna: Statystyki i lista problemów */}
      <Box
        flex={1}
        ml={2}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
        }}
      >
        <GameStats
          budget={budget}
          time={time}
          customerDissatisfaction={customerDissatisfaction}
        />
        <ProblemsList
          dynamicProblems={dynamicProblems}
          solvedProblems={solvedProblems}
          selectedProblem={selectedProblem}
          onSelectProblem={onSelectProblem}
        />
      </Box>
    </Box>
  );
};

export default GameLayout;
