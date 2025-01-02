import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { AttachMoney, AccessTime, SentimentDissatisfied } from '@mui/icons-material';

const GameStats = ({
  budget,
  time,
  customerDissatisfaction
}) => {
  return (
    <Box
      mb={2}
      p={2}
      bgcolor="primary.main"
      borderRadius={2}
      color="white"
    >
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Budżet */}
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <AttachMoney fontSize="large" />
            <Typography variant="body1">
              <strong>Budżet:</strong> {budget}
            </Typography>
          </Box>
        </Grid>

        {/* Czas */}
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <AccessTime fontSize="large" />
            <Typography variant="body1">
              <strong>Czas:</strong> {time}
            </Typography>
          </Box>
        </Grid>

        {/* Niezadowolenie klienta */}
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <SentimentDissatisfied fontSize="large" />
            <Typography variant="body1">
              <strong>Niezadowolenie:</strong> {customerDissatisfaction}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameStats;
