import { Card, CardContent, Typography } from '@mui/material';

const ProblemCard = ({ problem, isSolved, isClickable, onClick }) => {
  const borderColor = isSolved ? '2px solid green' : problem.isNew ? '2px solid red' : '1px solid gray';

  return (
    <Card
      style={{ 
        marginBottom: '10px',
        cursor: isClickable ? 'pointer' : 'default',
        border: borderColor,
        pointerEvents: isClickable ? 'auto' : 'none',
		minHeight: '180px',
      }}
      onClick={isClickable ? onClick : null}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5">{problem.name}</Typography>
        <Typography variant="body2">{problem.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProblemCard;
