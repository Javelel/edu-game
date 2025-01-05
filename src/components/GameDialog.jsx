import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

const GameDialog = ({ open, message, onRestart }) => (
  <Dialog
    open={open}
    onClose={() => {}} // Wyłączenie domyślnego zamykania na kliknięcie tła
    disableEscapeKeyDown // Wyłączenie zamykania okna klawiszem Esc
    PaperProps={{
      style: {
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(135deg, #ffffff, #f8f8f8)',
      },
    }}
  >
    {/* Nagłówek */}
    <DialogTitle
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
        color: 'white',
        padding: '15px',
        borderRadius: '15px 15px 0 0',
      }}
    >
      Wynik Gry
    </DialogTitle>

    {/* Treść */}
    <DialogContent
      style={{
        textAlign: 'center',
        padding: '20px 30px',
        color: '#444',
      }}
    >
      <Typography
        variant="body1"
        style={{
          minHeight: '200px',
          minWidth: '350px',
          margin: '20px 0',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          color: '#555',
          whiteSpace: 'pre-line',
        }}
      >
        {message}
      </Typography>
    </DialogContent>

    {/* Akcje */}
    <DialogActions style={{ justifyContent: 'center', paddingBottom: '15px' }}>
      <Button
        onClick={onRestart}
        style={{
          background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 24px',
          textTransform: 'uppercase',
          borderRadius: '25px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        Restartuj
      </Button>
    </DialogActions>
  </Dialog>
);

export default GameDialog;
