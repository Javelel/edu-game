import { createSlice } from '@reduxjs/toolkit';
import { problems } from '../../data/problems';
import { calculateCost } from '../../utils/taskHelpers';
import { tasks as initialTasks } from '../../data/tasks';

const initialState = {
  budget: 78,
  time: 52,
  expectedBudget: 78,
  expectedTime: 52,
  solvedTasks: [],
  solvedProblems: [],
  selectedTask: null,
  selectedProblem: null,
  dynamicProblems: [],
  tasks: { ...initialTasks },
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

		const allTasks = Object.values(state.tasks).flat();
		const task = allTasks.find((t) => t.id === taskId);

  		if (task) {
    		state.expectedBudget -= task.cost;
    		state.expectedTime -= task.duration;
  		}
	  
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

      const budgetCost = calculateCost(decision.budgetCost);
      const timeCost = calculateCost(decision.timeCost);

      state.budget -= budgetCost;
      state.time -= timeCost;

      if (decision.customerDissatisfaction) {
        state.customerDissatisfaction += decision.customerDissatisfaction;
      }

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
    restartGame: () => {
		return {
		  ...initialState,
		  tasks: { ...initialTasks },
		};
	  },
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
  applyDecision,
  setDialog,
  restartGame,
} = gameSlice.actions;

export default gameSlice.reducer;
