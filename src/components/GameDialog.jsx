import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

const GameDialog = ({ open, message, onRestart }) => (
  <Dialog open={open} onClose={onRestart}>
    <DialogTitle>Wynik</DialogTitle>
    <DialogContent>
      <Typography variant="body1">{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onRestart} color="primary">Restartuj</Button>
    </DialogActions>
  </Dialog>
);

export default GameDialog;
