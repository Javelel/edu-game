import { Card, CardContent, Button, Box, Typography } from '@mui/material';

const DecisionBox = ({ selectedItem, handleDecision }) => (
	<Card
    variant="elevation"
    elevation={3}
    style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        style={{
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        {selectedItem.name}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px', textAlign: 'center', color: '#555' }}>
        {selectedItem.description}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDecision(selectedItem.decision1)}
          style={{
            textAlign: 'left',
            justifyContent: 'space-between',
            padding: '15px',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {selectedItem.decision1.name}
          <Typography variant="caption" style={{ marginLeft: '10px', color: '#eee' }}>
            (Koszt: {selectedItem.decision1.budgetCost} budżetu, {selectedItem.decision1.timeCost} czasu
            {selectedItem.decision1.customerDissatisfaction !== undefined
              ? `, niezadowolenie klienta: ${selectedItem.decision1.customerDissatisfaction}`
              : ''}
            )
          </Typography>
        </Button>

        {selectedItem.decision2 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDecision(selectedItem.decision2)}
            style={{
              textAlign: 'left',
              justifyContent: 'space-between',
              padding: '15px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            {selectedItem.decision2.name}
            <Typography variant="caption" style={{ marginLeft: '10px', color: '#eee' }}>
              (Koszt: {selectedItem.decision2.budgetCost} budżetu, {selectedItem.decision2.timeCost} czasu
              {selectedItem.decision2.customerDissatisfaction !== undefined
                ? `, niezadowolenie klienta: ${selectedItem.decision2.customerDissatisfaction}`
                : ''}
              )
            </Typography>
          </Button>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default DecisionBox;
