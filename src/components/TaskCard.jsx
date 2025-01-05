import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AttachMoney, AccessTime } from '@mui/icons-material';

const TaskCard = ({
  task,
  isSolved,
  isClickable,
  onClick,
  isSelected,
  solvedDecision
}) => {
  const borderColor = isSelected
    ? "4px solid blue"
    : isSolved
    ? "2px solid green"
    : "1px solid gray";

  const backgroundColor = isSolved ? '#e8f5e9' : '#fff';

  const actualCost = task.actualBudgetCost;
  const actualDuration = task.actualTimeCost;

  return (
    <Card
      style={{
        marginBottom: '8px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
        minHeight: '240px',
        padding: '8px',
        backgroundColor,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}
        >
          {task.name}
        </Typography>
        <Typography variant="body2" style={{ fontSize: '14px', color: '#555' }}>
          {task.description}
        </Typography>

        <Box mt={1}>
          {/* ------------------------------------------
              KOSZT
          ------------------------------------------ */}
          {task.cost ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <AttachMoney fontSize="small" style={{ color: '#4caf50' }} />
              <Typography variant="body2" style={{ fontSize: '12px', color: '#333' }}>
                <strong>Przewidywany koszt:</strong> {task.cost} 000 PLN
                {/* NEW: pokazuj rzeczywisty koszt tylko, jeśli isSolved = true */}
                {isSolved && actualCost != null && (
                  <span style={{ fontSize: '12px', color: '#777' }}>
                    {' '}(rzeczywisty: {actualCost} 000 PLN)
                  </span>
                )}
              </Typography>
            </Box>
          ) : (
            /* Jeżeli w definicji zadania nie ma cost,
               a zadanie jest rozwiązane => wyświetlamy tylko rzeczywisty koszt */
            isSolved && actualCost != null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AttachMoney fontSize="small" style={{ color: '#4caf50' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Koszt:</strong> {actualCost} 000 PLN
                </Typography>
              </Box>
            )
          )}

          {/* ------------------------------------------
              CZAS
          ------------------------------------------ */}
          {task.duration ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <AccessTime fontSize="small" style={{ color: '#ff9800' }} />
              <Typography variant="body2" style={{ fontSize: '12px', color: '#333' }}>
                <strong>Przewidywany czas:</strong> {task.duration} tygodni
                {/* NEW: pokazuj rzeczywisty czas tylko, jeśli isSolved = true */}
                {isSolved && actualDuration != null && (
                  <span style={{ fontSize: '12px', color: '#777' }}>
                    {' '}(rzeczywisty: {actualDuration} tygodni)
                  </span>
                )}
              </Typography>
            </Box>
          ) : (
            /* jeżeli w definicji zadania nie ma duration,
               a zadanie jest rozwiązane => wyświetlamy tylko rzeczywisty czas */
            isSolved && actualDuration != null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AccessTime fontSize="small" style={{ color: '#ff9800' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Czas:</strong> {actualDuration} tygodni
                </Typography>
              </Box>
            )
          )}

          {/* ------------------------------------------
              DECYZJA
          ------------------------------------------ */}
          {isSolved && solvedDecision && (
            <Box mt={2}>
              <Typography
                variant="body2"
                style={{ fontSize: '12px', color: '#00796b', fontStyle: 'italic' }}
              >
                Podjęta decyzja: {solvedDecision}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
