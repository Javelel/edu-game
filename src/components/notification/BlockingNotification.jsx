import { Card, CardContent, Typography } from '@mui/material';

const BlockingNotification = ({ message }) => (
  <Card
    variant="elevation"
    elevation={3}
    style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#fffbea',
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#ff9800',
        }}
      >
        ⛔ Problem blokuje przejście do kolejnego etapu
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        {message}
      </Typography>
    </CardContent>
  </Card>
);

export default BlockingNotification;
