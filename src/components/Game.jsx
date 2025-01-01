import React from 'react';
import { Box } from '@mui/material';
import GameStats from './GameStats';
import TaskStagesGrid from './TaskStagesGrid';
import UnexpectedTasksGrid from './UnexpectedTasksGrid';
import ProblemsList from './ProblemsList';
import DecisionBox from './DecisionBox';
import GameDialog from './GameDialog';
import ProblemNotification from './ProblemNotification';

import useGameLogic from '../hooks/useGameLogic';
import { tasks } from '../data/tasks'; // żeby przekazać do TaskStagesGrid

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
    <Box p={3}>
      {/* Sekcja statystyk */}
      <GameStats
        budget={budget}
        time={time}
        customerDissatisfaction={customerDissatisfaction}
      />

      {/* Zadania główne w poszczególnych etapach */}
      <TaskStagesGrid
        columns={columns}
        tasks={tasks}
        solvedTasks={solvedTasks}
      />

      {/* Zadania nieprzewidziane */}
      <Box mt={2}>
        <UnexpectedTasksGrid
          columns={columns}
          unexpectedTasks={unexpectedTasks}
          solvedTasks={solvedTasks}
          onTaskSelect={() => { /* ... jeśli chcesz, możesz obsłużyć to tutaj */ }}
        />
      </Box>

      {/* Lista problemów dynamicznych */}
      <ProblemsList
        dynamicProblems={dynamicProblems}
        solvedProblems={solvedProblems}
        onSelectProblem={handleSelectProblem}
      />

      {/* Sekcja decyzji lub powiadomienie o problemie */}
      <Box mt={4}>
        {showProblemNotification ? (
          <ProblemNotification
            message={problemNotificationMessage}
            onClose={handleCloseProblemNotification}
          />
        ) : (
          (selectedTask || selectedProblem) && (
            <DecisionBox
              selectedItem={selectedTask || selectedProblem}
              handleDecision={handleDecision}
            />
          )
        )}
      </Box>

      {/* Dialog końcowy / restart gry */}
      <GameDialog
        open={dialogOpen}
        message={dialogMessage}
        onRestart={handleRestart}
      />
    </Box>
  );
};

export default Game;
