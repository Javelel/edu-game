import { Card, CardContent, Button, Box, Typography, Tooltip } from '@mui/material';
import { AttachMoney, AccessTime, SentimentDissatisfied } from '@mui/icons-material';

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
		<Typography
		  variant="body1"
		  style={{ marginBottom: '20px', textAlign: 'center', color: '#555' }}
		>
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
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} style={{ marginLeft: '10px' }}>
            {selectedItem.decision1.budgetCost !== 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <AttachMoney fontSize="small"/>
                <Typography variant="body2">
                  -{selectedItem.decision1.budgetCost} 000 PLN
                </Typography>
              </Box>
            )}

            {selectedItem.decision1.timeCost !== 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTime fontSize="small"/>
                <Typography variant="body2">
                  -{selectedItem.decision1.timeCost} tygodni
                </Typography>
              </Box>
            )}

            {selectedItem.decision1.customerDissatisfaction !== undefined && (
              <Box display="flex" alignItems="center" gap={1}>
                <SentimentDissatisfied fontSize="small"/>
                <Typography variant="body2">
                  +{selectedItem.decision1.customerDissatisfaction}
                </Typography>
              </Box>
            )}
          </Box>
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
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} style={{ marginLeft: '10px' }}>
              {selectedItem.decision2.budgetCost !== 0 && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoney fontSize="small"/>
                  <Typography variant="body2">
                    -{selectedItem.decision2.budgetCost} 000 PLN
                  </Typography>
                </Box>
              )}

              {selectedItem.decision2.timeCost !== 0 && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime fontSize="small"/>
                  <Typography variant="body2">
                    -{selectedItem.decision2.timeCost} tygodni
                  </Typography>
                </Box>
              )}

              {selectedItem.decision2.customerDissatisfaction !== undefined && (
                <Box display="flex" alignItems="center" gap={1}>
                  <SentimentDissatisfied fontSize="small"/>
                  <Typography variant="body2">
                    +{selectedItem.decision2.customerDissatisfaction}
                  </Typography>
                </Box>
              )}
            </Box>
          </Button>
        )}
      </Box>
	  </CardContent>
	</Card>
  );
  
  export default DecisionBox;
