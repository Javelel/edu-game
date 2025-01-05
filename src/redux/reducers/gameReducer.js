import { createSlice } from '@reduxjs/toolkit';
import { problems } from '../../data/problems';
import { calculateCost } from '../../utils/taskHelpers';

// Funkcja pomocnicza: obsługa rzutów kostką
// const calculateCost = (cost) => {
//   if (typeof cost === 'number') return cost;

//   const parts = cost.split('+');
//   let total = 0;

//   for (const part of parts) {
//     if (part.includes('k6')) {
//       const multiplier = parseInt(part.replace('k6', ''), 10) || 1;
//       total += multiplier * Math.floor(Math.random() * 6 + 1); // Rzut kostką (1-6)
//     } else {
//       total += parseInt(part, 10);
//     }
//   }

//   return total;
// };

const initialState = {
  budget: 70,
  time: 55,
  solvedTasks: [],
  solvedProblems: [],
  selectedTask: null,
  selectedProblem: null,
  dynamicProblems: [],
  problemChances: problems.reduce((acc, problem) => {
    acc[problem.id] = problem.baseChance;
    return acc;
  }, {}),
  addedProblems: {},
  customerDissatisfaction: 0,
  dialogOpen: false,
  dialogMessage: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setBudget: (state, action) => { state.budget = action.payload },
    setTime: (state, action) => { state.time = action.payload },
    addSolvedTask: (state, action) => { 
		const {
		  taskId,
		  decisionId,
		  decisionName,
		  actualBudgetCost,
		  actualTimeCost,
		} = action.payload;
	  
		state.solvedTasks.push({
		  taskId,
		  decisionId,
		  decisionName,
		  actualBudgetCost,
		  actualTimeCost,
		});
	  },
	  addSolvedProblem: (state, action) => {
		const { problemId, decisionName, actualBudgetCost, actualTimeCost } = action.payload;
		state.solvedProblems.push({
		  problemId,
		  decisionName,
		  actualBudgetCost,
		  actualTimeCost,
		});
	  },
    setSelectedTask: (state, action) => { state.selectedTask = action.payload },
    setSelectedProblem: (state, action) => { state.selectedProblem = action.payload },
    addDynamicProblem: (state, action) => {
      const problem = action.payload;
      state.dynamicProblems.push(problem);
      state.addedProblems[problem.id] = true;
    },
    adjustProblemChance: (state, action) => {
      const { problemId, change } = action.payload;
      state.problemChances[problemId] = (state.problemChances[problemId] || 0) + change;
    },
    incrementCustomerDissatisfaction: (state, action) => {
      state.customerDissatisfaction += action.payload || 1;
    },
    applyDecision: (state, action) => {
      const decision = action.payload;

      // Oblicz koszty dynamicznie
      const budgetCost = calculateCost(decision.budgetCost);
      const timeCost = calculateCost(decision.timeCost);

      // Aktualizuj budżet i czas
      state.budget -= budgetCost;
      state.time -= timeCost;

      // Dodaj niezadowolenie klienta (jeśli występuje)
      if (decision.customerDissatisfaction) {
        state.customerDissatisfaction += decision.customerDissatisfaction;
      }

      // Aktualizuj szanse wystąpienia problemów
      if (decision.chanceAdjustment) {
        decision.chanceAdjustment.forEach(({ problemId, change }) => {
          state.problemChances[problemId] = (state.problemChances[problemId] || 0) + change;
        });
      }
    },
    setDialog: (state, action) => {
      state.dialogOpen = action.payload.open;
      state.dialogMessage = action.payload.message;
    },
    restartGame: () => initialState,
  },
});

export const {
  setBudget,
  setTime,
  addSolvedTask,
  addSolvedProblem,
  setSelectedTask,
  setSelectedProblem,
  addDynamicProblem,
  adjustProblemChance,
  incrementCustomerDissatisfaction,
  applyDecision, // Dodano nową akcję
  setDialog,
  restartGame,
} = gameSlice.actions;

export default gameSlice.reducer;
