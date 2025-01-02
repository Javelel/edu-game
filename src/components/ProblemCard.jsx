import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProblemCard = ({ problem, isSolved, isClickable, onClick, isSelected }) => {
	const borderColor = isSelected
    ? "4px solid blue"
    : isSolved
    ? "2px solid green"
    : "2px solid red";

	const backgroundColor = isSelected
    ? "rgba(25, 118, 210, 0.1)"
    : isSolved
    ? "#e8f5e9"
    : "#fff";

  return (
    <Card
      style={{
        marginBottom: "10px",
        cursor: isClickable ? "pointer" : "default",
        border: borderColor,
        pointerEvents: isClickable ? "auto" : "none",
        minHeight: "90px",
        maxWidth: "250px",
        backgroundColor,
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="h5"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: isSelected ? "#1976d2" : "#333",
          }}
        >
          {problem.name}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: "#555",
            marginTop: "10px",
            lineHeight: "1.4",
          }}
        >
          {problem.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
