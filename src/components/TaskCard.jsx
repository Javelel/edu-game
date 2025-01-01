import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const TaskCard = ({ task, isSolved, isClickable, onClick }) => {
  const borderColor = isSolved
    ? '2px solid green'
    : '1px solid gray';

  return (
    <Card
      style={{
        marginBottom: '10px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
        minHeight: '180px',
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5">{task.name}</Typography>
        <Typography variant="body2">{task.description}</Typography>
		<Box mt={2}>
          <Typography variant="body2">
            <strong>Przewidywany koszt:</strong> {task.cost || 'Nieznany'}
          </Typography>
          <Typography variant="body2">
            <strong>Przewidywany czas:</strong> {task.duration || 'Nieznany'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
