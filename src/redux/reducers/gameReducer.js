import { createSlice } from '@reduxjs/toolkit';
import { potentialProblems } from '../../data/potential-problems';

const initialState = {
  budget: 20,
  time: 20,
  solvedProblems: [],
  selectedProblem: null,
  dynamicProblems: {},
  problemChances: potentialProblems.reduce((acc, problem) => {
    acc[problem.id] = problem.baseChance;
    return acc;
  }, {}),
  addedProblems: {},
  aiCount: 0,
  customerSatisfaction: 0,
  dialogOpen: false,
  dialogMessage: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setBudget: (state, action) => { state.budget = action.payload },
    setTime: (state, action) => { state.time = action.payload },
    addSolvedProblem: (state, action) => { state.solvedProblems.push(action.payload) },
    setSelectedProblem: (state, action) => { state.selectedProblem = action.payload },
    addDynamicProblem: (state, action) => {
      const { category, problem } = action.payload;
      if (!state.dynamicProblems[category]) state.dynamicProblems[category] = [];
      state.dynamicProblems[category].push(problem);
      state.addedProblems[problem.id] = true;
    },
    adjustProblemChance: (state, action) => {
      const { problemId, change } = action.payload;
      state.problemChances[problemId] = (state.problemChances[problemId] || 0) + change;
    },
    incrementAiCount: (state) => { state.aiCount += 1 },
    incrementCustomerSatisfaction: (state) => { state.customerSatisfaction += 1 },
    setDialog: (state, action) => {
      state.dialogOpen = action.payload.open;
      state.dialogMessage = action.payload.message;
    },
    restartGame: () => initialState
  },
});

export const {
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
} = gameSlice.actions;

export default gameSlice.reducer;
