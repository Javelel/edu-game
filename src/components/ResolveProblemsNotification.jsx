import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ResolveProblemsNotification = () => (
  <Card
    variant="elevation"
    elevation={3}
    style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#e3f2fd', // Jasny kolor przypominający kontekst rozwiązania problemów
	  pointerEvents: 'none',
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976d2', // Kolor główny podkreślający informację
        }}
      >
        ✨ Rozwiąż pozostałe problemy
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        Wszystkie zadania zostały już ukończone, ale wciąż pozostały nierozwiązane problemy.
      </Typography>
    </CardContent>
  </Card>
);

export default ResolveProblemsNotification;
