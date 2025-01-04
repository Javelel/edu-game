import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const TaskCard = ({ task, isSolved, isClickable, onClick, isSelected, solvedDecision }) => {
	const borderColor = isSelected
    ? "4px solid blue"
    : isSolved
    ? "2px solid green"
    : "1px solid gray";

	const backgroundColor = isSolved ? '#e8f5e9' : '#fff';

  return (
    <Card
      style={{
        marginBottom: '8px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
        minHeight: '120px',
        padding: '8px',
        backgroundColor,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Dodanie subtelnego cienia
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
          {task.cost != null && task.cost !== '' && (
            <Typography variant="body2" style={{ fontSize: '12px', color: '#666' }}>
              <strong>Przewidywany koszt:</strong> {task.cost}
            </Typography>
          )}
          {task.duration != null && task.duration !== '' && (
            <Typography variant="body2" style={{ fontSize: '12px', color: '#666' }}>
              <strong>Przewidywany czas:</strong> {task.duration}
            </Typography>
          )}
		  {isSolved && solvedDecision && (
          <Box mt={1}>
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
