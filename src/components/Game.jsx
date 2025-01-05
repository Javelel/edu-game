import React from "react";
import { Box } from "@mui/material";
import GameStats from "./GameStats";
import TaskStagesGrid from "./TaskStagesGrid";
import UnexpectedTasksGrid from "./UnexpectedTasksGrid";
import ProblemsList from "./ProblemsList";
import DecisionBox from "./DecisionBox";
import GameDialog from "./GameDialog";
import ProblemNotification from "./ProblemNotification";
import BlockingNotification from "./BlockingNotification";
import TaskNotification from "./TaskNotification";
import ResolveProblemsNotification from "./ResolveProblemsNotification";

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
	showBlockingNotification,
    blockingNotificationMessage,
    showProblemNotification,
    problemNotificationMessage,
	showTaskNotification,
    taskNotificationMessage,
    unexpectedTasks,
    customerDissatisfaction,
    dialogOpen,
    dialogMessage,
	showResolveProblemsNotification,
  	setShowResolveProblemsNotification,
	
    // funkcje
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
	handleCloseTaskNotification,
    handleRestart,
  } = useGameLogic();

  return (
    <Box p={3} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sekcja statystyk */}
  <Box style={{ position: 'sticky', top: 0, zIndex: 0, backgroundColor: 'primary.main' }}>
    <GameStats
      budget={budget}
      time={time}
      customerDissatisfaction={customerDissatisfaction}
    />
  </Box>

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
	  {(showBlockingNotification ||
  		showProblemNotification ||
  		showTaskNotification ||     // <--- też bym tu dodał,
  		selectedTask ||
  		selectedProblem ||
  		showResolveProblemsNotification) && (
        <Box
          style={{
            position: 'fixed',
            bottom: 0,
            left: '12.5%',
            width: '75%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex: 1000,
            padding: '10px',
          }}
        >
          {showBlockingNotification ? (
            <BlockingNotification message={blockingNotificationMessage} />
          ) : showProblemNotification ? (
            <ProblemNotification
              message={problemNotificationMessage}
              onClose={handleCloseProblemNotification}
            />
          ) : showTaskNotification ? (
            <TaskNotification
              message={taskNotificationMessage}
              onClose={handleCloseTaskNotification}
            />
          ) : showResolveProblemsNotification ? (
			<ResolveProblemsNotification
			  onClose={() => setShowResolveProblemsNotification(false)}
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
