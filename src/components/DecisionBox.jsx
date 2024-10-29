import { Card, CardContent, Button, Box, Typography } from '@mui/material';

const DecisionBox = ({ selectedProblem, handleDecision }) => (
  <Card variant="outlined" style={{ maxWidth: '500px', width: '100%' }}>
    <CardContent>
      <Typography variant="h5">{selectedProblem.name}</Typography>
      <Typography variant="body1">{selectedProblem.description}</Typography>

      <Box mt={2}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => handleDecision(selectedProblem.decision1)}
          style={{ marginBottom: '10px', whiteSpace: 'normal', textAlign: 'left' }}
        >
          {selectedProblem.decision1.name} (Koszt: {selectedProblem.decision1.budgetCost} budżetu, {selectedProblem.decision1.timeCost} czasu {selectedProblem.decision1.ai ? `, AI: ${selectedProblem.decision1.ai}` : ''} {selectedProblem.decision1.customerSatisfaction !== undefined ? `, satysfakcja klienta: ${selectedProblem.decision1.customerSatisfaction}` : ''})
        </Button>
        
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => handleDecision(selectedProblem.decision2)}
          style={{ whiteSpace: 'normal', textAlign: 'left' }}
        >
          {selectedProblem.decision2.name} (Koszt: {selectedProblem.decision2.budgetCost} budżetu, {selectedProblem.decision2.timeCost} czasu {selectedProblem.decision2.ai ? `, AI: ${selectedProblem.decision2.ai}` : ''} {selectedProblem.decision2.customerSatisfaction !== undefined ? `, satysfakcja klienta: ${selectedProblem.decision2.customerSatisfaction}` : ''})
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default DecisionBox;
