import React from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
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

import useGameLogic from "../hooks/useGameLogic";
import { tasks } from "../data/tasks";

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
    budgetTimeHistory,
    setShowResolveProblemsNotification,
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleCloseTaskNotification,
    handleRestart,
  } = useGameLogic();

  return (
    <Box p={3} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
    position: 'fixed', // Pozycjonowanie elementu względem ekranu
    bottom: 0, // Przylega do dolnej krawędzi ekranu
    left: 0, // Rozpoczyna od lewej krawędzi ekranu
    width: '100%', // Zajmuje całą szerokość ekranu
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1000,
    padding: '10px',
    display: 'flex', // Ustawienie elementów w rzędzie
    justifyContent: 'space-between', // Wyrównanie elementów z odstępem między nimi
    alignItems: 'flex-end', // Elementy wyrównane do dołu wewnątrz kontenera
  }}
>
  {/* Sekcja wykresów */}
  <Box style={{ flex: 1, marginRight: '16px' }}>
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
