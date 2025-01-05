import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { AttachMoney, AccessTime } from '@mui/icons-material';

const ProblemCard = ({
  problem,
  isSolved,
  isClickable,
  onClick,
  isSelected,
  solvedDecision
}) => {
  const borderColor = isSelected
    ? '4px solid blue'
    : isSolved
    ? '2px solid green'
    : '2px solid red';

  const backgroundColor = isSelected
    ? 'rgba(25, 118, 210, 0.1)'
    : isSolved
    ? '#e8f5e9'
    : '#fff';

  const actualCost = problem.actualBudgetCost;
  const actualTime = problem.actualTimeCost;

  return (
    <Card
      style={{
        marginBottom: '10px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
        minHeight: '90px',
        maxWidth: '250px',
        backgroundColor,
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography
          variant="h5"
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: isSelected ? '#1976d2' : '#333',
          }}
        >
          {problem.name}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: '#555',
            marginTop: '10px',
            lineHeight: '1.4',
          }}
        >
          {problem.description}
        </Typography>

        {isSolved && solvedDecision && (
          <Box mt={1}>
            <Typography
              variant="body2"
              style={{
                fontSize: '12px',
                color: '#00796b',
                fontStyle: 'italic',
              }}
            >
              Rozwiązanie: {solvedDecision}
            </Typography>
          </Box>
        )}

        {/* Sekcja rzeczywistego kosztu i czasu (wyświetlana tylko gdy problem jest rozwiązany) */}
        {isSolved && (actualCost != null || actualTime != null) && (
          <Box mt={2}>
            {actualCost != null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AttachMoney fontSize="small" style={{ color: '#4caf50' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Koszt:</strong> {actualCost} 000 PLN
                </Typography>
              </Box>
            )}
            {actualTime != null && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <AccessTime fontSize="small" style={{ color: '#ff9800' }} />
                <Typography variant="body2" style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Czas:</strong> {actualTime} tygodni
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
