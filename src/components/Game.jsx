import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';
import { problems } from '../data/problems';
import ProblemCard from './ProblemCard';
import DecisionBox from './DecisionBox';
import GameDialog from './GameDialog';
import {
  setBudget,
  setTime,
  addSolvedProblem,
  setSelectedProblem,
  addDynamicProblem,
  adjustProblemChance,
  incrementAiCount,
  incrementCustomerSatisfaction,
  setDialog,
  restartGame,
} from '../redux/reducers/gameReducer';
import { potentialProblems } from '../data/potential-problems';

const Game = () => {
  const dispatch = useDispatch();
  const {
    budget,
    time,
    solvedProblems,
    selectedProblem,
    dynamicProblems,
    problemChances,
    addedProblems,
    aiCount,
    customerSatisfaction,
    dialogOpen,
    dialogMessage,
  } = useSelector((state) => state.game);

  const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];

  const canClickProblem = (categoryIndex) => {
    if (categoryIndex === 0) return true;
    const previousCategoryProblems = problems[columns[categoryIndex - 1]];
    return previousCategoryProblems.every(problem => solvedProblems.includes(problem.id));
  };

  const handleCardClick = (problem, columnIndex) => {
    if (!selectedProblem && !solvedProblems.includes(problem.id) && canClickProblem(columnIndex)) {
      dispatch(setSelectedProblem(problem));
    }
  };

  const handleDecision = (decision) => {
    const newBudget = budget - decision.budgetCost;
    const newTime = time - decision.timeCost;

    if (newTime < 0) {
      dispatch(setDialog({ open: true, message: 'Brak czasu' }));
      return;
    }
    if (newBudget < 0) {
      dispatch(setDialog({ open: true, message: 'Brak pieniędzy' }));
      return;
    }

    dispatch(setBudget(newBudget));
    dispatch(setTime(newTime));
    dispatch(addSolvedProblem(selectedProblem.id));
    dispatch(setSelectedProblem(null));

    if (decision.chanceAdjustment) {
      decision.chanceAdjustment.forEach(({ problemId, change }) => {
        dispatch(adjustProblemChance({ problemId, change }));
      });
    }

    if (decision.ai) {
      dispatch(incrementAiCount());
    }
    if (decision.customerSatisfaction) {
      dispatch(incrementCustomerSatisfaction());
    }

    maybeAddNewProblem();

    const allProblemsCount = Object.values(problems).flat().length + Object.values(dynamicProblems).flat().length;
    if (solvedProblems.length + 1 === allProblemsCount) {
      const message = customerSatisfaction > 0 ? 'Brawo! Projekt się udał' : 'Klient nie jest zadowolony z projektu';
      dispatch(setDialog({ open: true, message }));
    }
  };

  const maybeAddNewProblem = () => {
    potentialProblems.forEach(problem => {
      if (!addedProblems[problem.id] && Math.random() < problemChances[problem.id]) {
        dispatch(addDynamicProblem({
          category: problem.category,
          problem: { ...problem, isNew: true }
        }));
      }
    });
  };

  const handleRestart = () => {
    dispatch(restartGame());
  };

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {Object.entries(problems).map(([categoryName, categoryProblems], colIndex) => (
          <Grid item xs={12 / columns.length} key={colIndex}>
            <Typography variant="h6" align="center" gutterBottom>
              {categoryName}
            </Typography>
            {[...(categoryProblems || []), ...(dynamicProblems[categoryName] || [])].map(problem => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                isSolved={solvedProblems.includes(problem.id)}
                isClickable={!selectedProblem && canClickProblem(colIndex) && !solvedProblems.includes(problem.id)}
                onClick={() => handleCardClick(problem, colIndex)}
              />
            ))}
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Box>
          <Typography variant="h6">Budżet: {budget}</Typography>
          <Typography variant="h6">Czas: {time}</Typography>
          <Typography variant="h6">AI: {aiCount}</Typography>
          <Typography variant="h6">Satysfakcja klienta: {customerSatisfaction}</Typography>
        </Box>

        {selectedProblem && (
          <DecisionBox 
            selectedProblem={selectedProblem} 
            handleDecision={handleDecision}
          />
        )}
      </Box>

      <GameDialog 
        open={dialogOpen} 
        message={dialogMessage} 
        onRestart={handleRestart} 
      />
    </Box>
  );
}

export default Game;
