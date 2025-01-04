import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

const GameDialog = ({ open, message, onRestart }) => (
	<Dialog
    open={open}
    onClose={onRestart}
    PaperProps={{
      style: {
        padding: '20px',
        borderRadius: '15px',
      },
    }}
  >
    <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
      Wynik Gry
    </DialogTitle>
    <DialogContent style={{ textAlign: 'center' }}>
      <Typography variant="body1" style={{ minHeight: '200px', minWidth: '350px', margin: '20px 0', color: '#555', whiteSpace: 'pre-line' }}>
        {message}
      </Typography>
    </DialogContent>
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button
        onClick={onRestart}
        color="primary"
        variant="contained"
        style={{ fontWeight: 'bold', padding: '10px 20px', textTransform: 'uppercase' }}
      >
        Restartuj
      </Button>
    </DialogActions>
  </Dialog>
);

export default GameDialog;
