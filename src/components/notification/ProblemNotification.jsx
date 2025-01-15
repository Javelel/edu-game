import { Card, CardContent, Button, Typography } from '@mui/material';

const ProblemNotification = ({ message, onClose }) => (
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
        ⚠️ Nowe Problemy
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
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        style={{
          marginTop: '30px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          padding: '10px 20px',
        }}
      >
        OK
      </Button>
    </CardContent>
  </Card>
);

export default ProblemNotification;
