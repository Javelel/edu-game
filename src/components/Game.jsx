import { useState } from "react";
import { Grid, Box, Typography } from '@mui/material';
import { problems } from '../data/problems';
import { potentialProblems } from "../data/potential-problems";
import ProblemCard from './ProblemCard';
import DecisionBox from './DecisionBox';
import GameDialog from './GameDialog';

const Game = () => {
  const [budget, setBudget] = useState(20);
  const [time, setTime] = useState(20);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dynamicProblems, setDynamicProblems] = useState({});
  const [problemChances, setProblemChances] = useState(() =>
    potentialProblems.reduce((acc, problem) => {
      acc[problem.id] = problem.baseChance;
      return acc;
    }, {})
  );

  const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];
  const [aiCount, setAiCount] = useState(0);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(0);

  const canClickProblem = (categoryIndex) => {
    if (categoryIndex === 0) return true;
    const previousCategoryProblems = problems[columns[categoryIndex - 1]];
    return previousCategoryProblems.every(problem => solvedProblems.includes(problem.id));
  };

  const adjustProblemChances = (decision) => {
    if (decision.chanceAdjustment) {
      setProblemChances(prev => {
        const updatedChances = { ...prev };
        decision.chanceAdjustment.forEach(({ problemId, change }) => {
          updatedChances[problemId] = (updatedChances[problemId] || 0) + change;
        });
        return updatedChances;
      });
    }
  };

  const maybeAddNewProblem = () => {
    potentialProblems.forEach(problem => {
      if (!problem.isAdded && Math.random() < problemChances[problem.id]) {
        setDynamicProblems(prev => ({
          ...prev,
          [problem.category]: [...(prev[problem.category] || []), { ...problem, isNew: true }]
        }));
        problem.isAdded = true;
      }
    });
  };

  const handleCardClick = (problem, columnIndex) => {
    if (!selectedProblem && !solvedProblems.includes(problem.id) && canClickProblem(columnIndex)) {
      setSelectedProblem(problem);
    }
  };

  const handleDecision = (decision) => {
    const newBudget = budget - decision.budgetCost;
    const newTime = time - decision.timeCost;

    if (newTime < 0) {
      setDialogMessage('Brak czasu');
      setDialogOpen(true);
      return;
    } 
    if (newBudget < 0) {
      setDialogMessage('Brak pieniędzy');
      setDialogOpen(true);
      return;
    } 

    setBudget(newBudget);
    setTime(newTime);
    setSolvedProblems([...solvedProblems, selectedProblem.id]); 
    setSelectedProblem(null); 
    
    adjustProblemChances(decision);
    maybeAddNewProblem();

    if (decision.ai) {
      setAiCount(aiCount + decision.ai);
    }
    if (decision.customerSatisfaction) {
      setCustomerSatisfaction(customerSatisfaction + decision.customerSatisfaction);
    }

    const allProblemsCount = Object.values(problems).flat().length + Object.values(dynamicProblems).flat().length;
    if (solvedProblems.length + 1 === allProblemsCount) {
      if (customerSatisfaction > 0) {
        setDialogMessage('Brawo! Projekt się udał');
        setDialogOpen(true);
      } else {
        setDialogMessage('Klient nie jest zadowolony z projektu');
        setDialogOpen(true);
      }
    }
  };

  const handleRestart = () => {
    setBudget(20);
    setTime(20);
    setSolvedProblems([]);
    setSelectedProblem(null);
    setAiCount(0);
    setCustomerSatisfaction(0);
    setDialogOpen(false);
    setDynamicProblems({});
    setProblemChances(potentialProblems.reduce((acc, problem) => {
      acc[problem.id] = problem.baseChance;
      return acc;
    }, {}));
  }

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
