import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDialog } from "../redux/reducers/gameReducer";

import GameLayout from "./layout/GameLayout";
import GameNotifications from "./notification/GameNotifications";
import GameEndDialog from "./GameEndDialog";
import StartScreen from "./StartScreen";

import useGameLogic from "../hooks/useGameLogic";
import { tasks } from "../data/tasks";

const Game = () => {
  // Logika gry z custom hooka
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

  // Stan startu i zakończenia gry
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    dispatch(setDialog({ open: false, message: "" }));
    setIsGameOver(true);
  };

  // Jeśli gra się nie zaczęła, wyświetlamy ekran startowy
  if (!isGameStarted) {
    return <StartScreen onStart={() => setIsGameStarted(true)} />;
  }

  return (
    <Box
      p={1}
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <GameLayout
        columns={columns}
        tasks={tasks}
        solvedTasks={solvedTasks}
        selectedTask={selectedTask}
        unexpectedTasks={unexpectedTasks}
        dynamicProblems={dynamicProblems}
        solvedProblems={solvedProblems}
        selectedProblem={selectedProblem}
        onSelectProblem={handleSelectProblem}
        budget={budget}
        time={time}
        customerDissatisfaction={customerDissatisfaction}
      />

      {/* Dialog końcowy / restart gry */}
      <GameEndDialog
        open={dialogOpen}
        message={dialogMessage}
        close={handleCloseDialog}
        budgetTimeHistory={budgetTimeHistory}
      />

      {/* Sekcja powiadomień, wykresów i decyzji */}
      <GameNotifications
        showBlockingNotification={showBlockingNotification}
        blockingNotificationMessage={blockingNotificationMessage}
        showProblemNotification={showProblemNotification}
        problemNotificationMessage={problemNotificationMessage}
        showTaskNotification={showTaskNotification}
        taskNotificationMessage={taskNotificationMessage}
        showResolveProblemsNotification={showResolveProblemsNotification}
        onCloseResolveProblemsNotification={() =>
          setShowResolveProblemsNotification(false)
        }
        handleCloseProblemNotification={handleCloseProblemNotification}
        handleCloseTaskNotification={handleCloseTaskNotification}
        selectedTask={selectedTask}
        selectedProblem={selectedProblem}
        handleDecision={handleDecision}
        budgetTimeHistory={budgetTimeHistory}
        isGameOver={isGameOver}
      />
    </Box>
  );
};

export default Game;
