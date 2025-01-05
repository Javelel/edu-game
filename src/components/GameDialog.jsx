import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material';
import { AttachMoney, AccessTime, SentimentDissatisfied } from '@mui/icons-material';

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
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
	  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Projekt sotał zakończony twoje statystyki to:
        </Typography>
        {/* Wyświetlanie ikon i danych */}
        <Box display="flex" alignItems="center" gap={1}>
          <AttachMoney fontSize="large" style={{ color: '#6a11cb' }} />
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Budżet: {message.budget} 000 PLN
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTime fontSize="large" style={{ color: '#6a11cb' }} />
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Czas: {message.time} tygodni
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <SentimentDissatisfied fontSize="large" style={{ color: '#6a11cb' }} />
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Niezadowolenie klienta: {message.customerDissatisfaction}
          </Typography>
        </Box>
      </Box>
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
