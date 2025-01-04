import React from 'react';
import { Box, Typography, Grid, Tooltip } from '@mui/material';
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
            <Tooltip title={<Typography variant="body2">Budżet</Typography>}>
              <AttachMoney fontSize="large" />
            </Tooltip>
            <Typography variant="body1">{budget} 000 PLN</Typography>
          </Box>
        </Grid>

        {/* Czas */}
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Tooltip title={<Typography variant="body2">Czas</Typography>}>
              <AccessTime fontSize="large" />
            </Tooltip>
            <Typography variant="body1">{time} tygodni</Typography>
          </Box>
        </Grid>

        {/* Niezadowolenie klienta */}
        <Grid item xs={4} style={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Tooltip title={<Typography variant="body2">Niezadowolenie klienta</Typography>}>
              <SentimentDissatisfied fontSize="large" />
            </Tooltip>
            <Typography variant="body1">{customerDissatisfaction}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameStats;
