import React from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BudgetTimeChart from "./BudgetTimeChart";
import BlockingNotification from "./BlockingNotification";
import ProblemNotification from "./ProblemNotification";
import TaskNotification from "./TaskNotification";
import ResolveProblemsNotification from "./ResolveProblemsNotification";
import DecisionBox from "./DecisionBox";

/**
 * Sekcja powiadomień i wykresów na dole ekranu
 */
const GameNotifications = ({
  showBlockingNotification,
  blockingNotificationMessage,
  showProblemNotification,
  problemNotificationMessage,
  showTaskNotification,
  taskNotificationMessage,
  showResolveProblemsNotification,
  onCloseResolveProblemsNotification,
  handleCloseProblemNotification,
  handleCloseTaskNotification,
  selectedTask,
  selectedProblem,
  handleDecision,
  budgetTimeHistory,
  isGameOver,
}) => {
  // Wyświetlamy obszar powiadomień, tylko jeśli coś ma się faktycznie pojawić
  const shouldDisplayNotifications =
    showBlockingNotification ||
    showProblemNotification ||
    showTaskNotification ||
    selectedTask ||
    selectedProblem ||
    showResolveProblemsNotification ||
    isGameOver;

  if (!shouldDisplayNotifications) return null;

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: 1000,
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      {/* Sekcja wykresu budżetu i czasu */}
      <Box style={{ flex: 1, marginRight: "16px", pointerEvents: "auto" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{
              background:
                "linear-gradient(90deg,rgb(178, 95, 255),rgb(243, 123, 254))",
            }}
          >
            <Typography style={{ color: "white" }}>Wykresy Budżetu i Czasu</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BudgetTimeChart history={budgetTimeHistory} />
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Sekcja powiadomień i DecisionBox */}
      <Box
        style={{
          flex: "none",
          width: "800px",
          marginLeft: "auto",
          pointerEvents: "auto",
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
          <ResolveProblemsNotification onClose={onCloseResolveProblemsNotification} />
        ) : isGameOver ? (
          <></>
        ) : (
          <DecisionBox
            selectedItem={selectedTask || selectedProblem}
            handleDecision={handleDecision}
          />
        )}
      </Box>
    </Box>
  );
};

export default GameNotifications;
