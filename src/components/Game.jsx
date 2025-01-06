import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import BudgetTimeChart from './BudgetTimeChart';
import StartScreen from "./StartScreen";

import useGameLogic from "../hooks/useGameLogic";
import { tasks } from "../data/tasks";

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false); // Dodany stan
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
    budgetTimeHistory,
    setShowResolveProblemsNotification,
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleCloseTaskNotification,
    handleRestart,
  } = useGameLogic();

  if (!isGameStarted) {
    return <StartScreen onStart={() => setIsGameStarted(true)} />;
  }

  return (
    <Box p={1} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Układ dwóch kolumn */}
      <Box display="flex" flexGrow={1} mb={6} style={{ overflowY: 'auto' }}>
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

        {/* Problemy, wykresy i statystyki */}
        <Box flex={1} ml={2} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
          <GameStats
            budget={budget}
            time={time}
            customerDissatisfaction={customerDissatisfaction}
          />
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
        budgetTimeHistory={budgetTimeHistory}
      />

      {/* Sekcja powiadomień i decyzji */}
      {(showBlockingNotification ||
        showProblemNotification ||
        showTaskNotification ||
        selectedTask ||
        selectedProblem ||
        showResolveProblemsNotification) && (
          <Box
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              zIndex: 1000,
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              pointerEvents: 'none',
            }}
          >
            {/* Sekcja wykresów */}
            <Box style={{ flex: 1, marginRight: '16px', pointerEvents: 'auto' }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{background: 'linear-gradient(90deg,rgb(178, 95, 255),rgb(243, 123, 254))',}}>
                  <Typography style={{color: 'white'}}>Wykresy Budżetu i Czasu</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BudgetTimeChart history={budgetTimeHistory} />
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* Sekcja DecisionBox i powiadomień */}
            <Box
              style={{
                flex: 'none',
                width: '800px',
                marginLeft: 'auto',
                pointerEvents: 'auto'
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
          </Box>
        )}
    </Box>
  );
};

export default Game;
