import React from "react";
import { Box } from "@mui/material";
import GameStats from "./GameStats";
import TaskStagesGrid from "./TaskStagesGrid";
import UnexpectedTasksGrid from "./UnexpectedTasksGrid";
import ProblemsList from "./ProblemsList";
import DecisionBox from "./DecisionBox";
import GameDialog from "./GameDialog";
import ProblemNotification from "./ProblemNotification";

import useGameLogic from "../hooks/useGameLogic";
import { tasks } from "../data/tasks"; // żeby przekazać do TaskStagesGrid

const Game = () => {
  const {
    columns,
    budget,
    time,
    solvedTasks,
    solvedProblems,
    selectedTask,
    selectedProblem,
    dynamicProblems,
    showProblemNotification,
    problemNotificationMessage,
    unexpectedTasks,
    customerDissatisfaction,
    dialogOpen,
    dialogMessage,

    // funkcje
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleRestart,
  } = useGameLogic();

  return (
    <Box p={3} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sekcja statystyk */}
      <GameStats
        budget={budget}
        time={time}
        customerDissatisfaction={customerDissatisfaction}
      />

      {/* Układ dwóch kolumn */}
      <Box display="flex" flexGrow={1} mt={2} mb={6} style={{ overflowY: 'auto' }}>
        {/* Tablica zadań */}
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

        {/* Problemy w jednej kolumnie */}
        <Box flex={0.5} ml={2}>
          <ProblemsList
            dynamicProblems={dynamicProblems}
            solvedProblems={solvedProblems}
            selectedProblem={selectedProblem}
            onSelectProblem={handleSelectProblem}
          />
        </Box>
      </Box>

      {/* Dialog końcowy / restart gry */}
      <GameDialog
        open={dialogOpen}
        message={dialogMessage}
        onRestart={handleRestart}
      />

      {/* Sekcja powiadomień i decyzji */}
      {(showProblemNotification || selectedTask || selectedProblem) && (
        <Box
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex: 1000,
            padding: '10px',
          }}
        >
          {showProblemNotification ? (
            <ProblemNotification
              message={problemNotificationMessage}
              onClose={handleCloseProblemNotification}
            />
          ) : (
            <DecisionBox
              selectedItem={selectedTask || selectedProblem}
              handleDecision={handleDecision}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Game;
