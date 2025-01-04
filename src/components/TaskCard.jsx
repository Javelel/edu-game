import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AttachMoney, AccessTime } from '@mui/icons-material';

const TaskCard = ({ task, isSolved, isClickable, onClick, isSelected, solvedDecision }) => {
	const borderColor = isSelected
    ? "4px solid blue"
    : isSolved
    ? "2px solid green"
    : "1px solid gray";

	const backgroundColor = isSolved ? '#e8f5e9' : '#fff';

  const getActualCost = () => {
    if (!isSolved || !solvedDecision) return null;
    const decision = [task.decision1, task.decision2].find(d => d.name === solvedDecision);
    return decision ? decision.budgetCost : null;
  };

  const getActualDuration = () => {
    if (!isSolved || !solvedDecision) return null;
    const decision = [task.decision1, task.decision2].find(d => d.name === solvedDecision);
    return decision ? decision.timeCost : null;
  };

  const actualCost = getActualCost();
  const actualDuration = getActualDuration();

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
          {task.cost != null && task.cost !== '' ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <AttachMoney fontSize="small" style={{ color: '#4caf50' }} />
              <Typography variant="body2" style={{ fontSize: '12px', color: '#333' }}>
                <strong>Przewidywany koszt:</strong> {task.cost} 000 PLN
                {actualCost !== null && (
                  <span style={{ fontSize: '12px', color: '#777' }}> (rzeczywisty: {actualCost} 000 PLN)</span>
                )}
              </Typography>
            </Box>
          ) : (
            actualCost !== null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AttachMoney fontSize="small" style={{ color: '#4caf50' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Koszt:</strong> {actualCost} 000 PLN
                </Typography>
              </Box>
            )
          )}
          {task.duration != null && task.duration !== '' ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <AccessTime fontSize="small" style={{ color: '#ff9800' }} />
              <Typography variant="body2" style={{ fontSize: '12px', color: '#333' }}>
                <strong>Przewidywany czas:</strong> {task.duration} tygodni
                {actualDuration !== null && (
                  <span style={{ fontSize: '12px', color: '#777' }}> (rzeczywisty: {actualDuration} tygodni)</span>
                )}
              </Typography>
            </Box>
          ) : (
            actualDuration !== null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AccessTime fontSize="small" style={{ color: '#ff9800' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Czas:</strong> {actualDuration} tygodni
                </Typography>
              </Box>
            )
          )}
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
