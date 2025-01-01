import { Card, CardContent, Button, Typography } from '@mui/material';

const ProblemNotification = ({ message, onClose }) => (
  <Card variant="outlined" style={{ maxWidth: '600px', margin: '20px auto' }}>
    <CardContent>
      <Typography variant="h5">Nowy Problem</Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        style={{ marginTop: '20px' }}
      >
        OK
      </Button>
    </CardContent>
  </Card>
);

export default ProblemNotification;
