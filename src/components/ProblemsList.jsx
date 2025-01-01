import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProblemCard from './ProblemCard';

const ProblemsList = ({
  dynamicProblems,
  solvedProblems,
  onSelectProblem
}) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography variant="h6">Problemy</Typography>
      <Grid container spacing={2}>
        {dynamicProblems.map(problem => (
          <Grid item xs={12} md={6} lg={4} key={problem.id}>
            <ProblemCard
              problem={problem}
              isSolved={solvedProblems.includes(problem.id)}
              isClickable={!solvedProblems.includes(problem.id)}
              onClick={() => onSelectProblem(problem)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProblemsList;
