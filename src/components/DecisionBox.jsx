import { Card, CardContent, Button, Box, Typography } from '@mui/material';

const DecisionBox = ({ selectedItem, handleDecision }) => (
  <Card variant="outlined" style={{ maxWidth: '600px', margin: '20px auto' }}>
    <CardContent>
      <Typography variant="h5">{selectedItem.name}</Typography>
      <Typography variant="body1">{selectedItem.description}</Typography>

      <Box mt={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleDecision(selectedItem.decision1)}
          style={{ marginBottom: '10px', whiteSpace: 'normal', textAlign: 'left' }}
        >
          {selectedItem.decision1.name} 
          (Koszt: {selectedItem.decision1.budgetCost} budżetu, 
          {selectedItem.decision1.timeCost} czasu
          {selectedItem.decision1.customerDissatisfaction !== undefined 
            ? `, niezadowolenie klienta: ${selectedItem.decision1.customerDissatisfaction}` 
            : ''}
          )
        </Button>

        {selectedItem.decision2 && ( // Renderuj tylko, jeśli decision2 istnieje
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDecision(selectedItem.decision2)}
            style={{ whiteSpace: 'normal', textAlign: 'left' }}
          >
            {selectedItem.decision2.name} 
            (Koszt: {selectedItem.decision2.budgetCost} budżetu, 
            {selectedItem.decision2.timeCost} czasu
            {selectedItem.decision2.customerDissatisfaction !== undefined 
              ? `, niezadowolenie klienta: ${selectedItem.decision2.customerDissatisfaction}` 
              : ''}
            )
          </Button>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default DecisionBox;
