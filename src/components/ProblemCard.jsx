import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProblemCard = ({ problem, isSolved, isClickable, onClick }) => {
  const borderColor = isSolved ? '2px solid green' : '2px solid red';

  return (
    <Card
      style={{
        marginBottom: '10px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
        minHeight: '90px',
		maxWidth: '350px',
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5">{problem.name}</Typography>
        <Typography variant="body2">{problem.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
