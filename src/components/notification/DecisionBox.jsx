import { Card, CardContent, Button, Box, Typography } from '@mui/material';
import { AttachMoney, AccessTime, SentimentDissatisfied } from '@mui/icons-material';

const DecisionBox = ({ selectedItem, handleDecision }) => {
  const parseRange = (value) => {
    if (typeof value === 'string' && value.includes('k6')) {
      const multiplier = value.includes('x') ? parseInt(value.split('x')[1], 10) : 1;
      return `od -${multiplier} 000 do -${6 * multiplier} 000 PLN`;
    }
    return value !== 0 ? `-${value} 000 PLN` : null;
  };

  const parseTimeRange = (value) => {
    if (typeof value === 'string' && value.includes('k6')) {
      const multiplier = value.includes('x') ? parseInt(value.split('x')[1], 10) : 1;
      return `od -${multiplier} do -${6 * multiplier} tygodni`;
    }
    return value !== 0 ? `-${value} tygodni` : null;
  };

  return (
    <Card
      variant="elevation"
      elevation={3}
      style={{
        maxWidth: '1000px',
        margin: '0px auto',
        backgroundColor: '#C0E0FF',
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
          {selectedItem.descriptionLong}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            onClick={() => handleDecision(selectedItem.decision1)}
            style={{
              textAlign: 'left',
              justifyContent: 'space-between',
              padding: '10px 15px',
              fontWeight: 'bold',
              fontSize: '14px',
              textTransform: 'none',
			  background: 'linear-gradient(90deg, #6a11cb, #2575fc)'
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ width: '100%' }}>
              <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold' }}>
                {selectedItem.decision1.name}
              </Typography>
              <Typography variant="body2" style={{ color: '#fff' }}>
                {selectedItem.decision1.description}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} style={{ minWidth: '180px' }}>
              {parseRange(selectedItem.decision1.budgetCost) && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoney fontSize="small" />
                  <Typography variant="body2">
                    {parseRange(selectedItem.decision1.budgetCost)}
                  </Typography>
                </Box>
              )}
              {parseTimeRange(selectedItem.decision1.timeCost) && (
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime fontSize="small" />
                  <Typography variant="body2">
                    {parseTimeRange(selectedItem.decision1.timeCost)}
                  </Typography>
                </Box>
              )}
              {selectedItem.decision1.customerDissatisfaction !== undefined && (
                <Box display="flex" alignItems="center" gap={1}>
                  <SentimentDissatisfied fontSize="small" />
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
              onClick={() => handleDecision(selectedItem.decision2)}
              style={{
                textAlign: 'left',
                justifyContent: 'space-between',
                padding: '10px 15px',
                fontWeight: 'bold',
                fontSize: '14px',
                textTransform: 'none',
				background: 'linear-gradient(90deg,rgb(178, 95, 255),rgb(243, 123, 254))',
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ width: '100%' }}>
                <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold' }}>
                  {selectedItem.decision2.name}
                </Typography>
                <Typography variant="body2" style={{ color: '#fff' }}>
                  {selectedItem.decision2.description}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} style={{ minWidth: '180px' }}>
                {parseRange(selectedItem.decision2.budgetCost) && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <AttachMoney fontSize="small" />
                    <Typography variant="body2">
                      {parseRange(selectedItem.decision2.budgetCost)}
                    </Typography>
                  </Box>
                )}
                {parseTimeRange(selectedItem.decision2.timeCost) && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      {parseTimeRange(selectedItem.decision2.timeCost)}
                    </Typography>
                  </Box>
                )}
                {selectedItem.decision2.customerDissatisfaction !== undefined && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <SentimentDissatisfied fontSize="small" />
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
};

export default DecisionBox;
