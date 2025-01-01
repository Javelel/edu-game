import React from 'react';
import { Box, Typography } from '@mui/material';

const GameStats = ({
  budget,
  time,
  customerDissatisfaction
}) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">Statystyki</Typography>
      <Typography variant="body1">
        Budżet: {budget} | Czas: {time} | Niezadowolenie klienta: {customerDissatisfaction}
      </Typography>
    </Box>
  );
};

export default GameStats;
