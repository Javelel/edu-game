import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	setDialog,
	setSelectedTask,
	setSelectedProblem,
	setBudget,
	restartGame,
	applyDecision,
	addSolvedTask,
	addSolvedProblem,
} from '../redux/reducers/gameReducer';

import { tasks as initialTasks } from '../data/tasks';
import { unexpectedTasks as unexpectedTasksData } from '../data/unexpectedTasks';
import { problems } from '../data/problems';

import { getNextUnsolvedTaskWithUnexpected, calculateCost } from '../utils/taskHelpers';

import useBudgetTimeHistory from './logic/useBudgetTimeHistory';
import useNotifications from './logic/useNotifications';
import useNextTaskSelection from './logic/useNextTaskSelection';
import useUnexpectedTasks from './logic/useUnexpectedTasks';
import useGameFlow from './logic/useGameFlow';
import useHandlers from './logic/useHandlers';

const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];

export default function useGameLogic() {
	const dispatch = useDispatch();

	const {
		budget,
		time,
		expectedBudget,
		expectedTime,
		solvedTasks,
		solvedProblems,
		dynamicProblems,
		addedProblems,
		selectedTask,
		selectedProblem,
		customerDissatisfaction,
		dialogOpen,
		dialogMessage,
	} = useSelector((state) => state.game);

	const [tasks, setTasks] = useState({ ...initialTasks });
	const [unexpectedTasks, setUnexpectedTasks] = useState([]);

	const [stagesWithUnexpectedAdded, setStagesWithUnexpectedAdded] = useState([]);
	const [stagesWithProblemsAdded, setStagesWithProblemsAdded] = useState([]);

	const [budgetTimeHistory, setBudgetTimeHistory] = useState([
		{ budget, time, expectedBudget, expectedTime }
	]);

	const [newProblemJustAdded, setNewProblemJustAdded] = useState(false);

	const [problemQueue, setProblemQueue] = useState([]);
	const [taskQueue, setTaskQueue] = useState([]);

	const [showProblemNotification, setShowProblemNotification] = useState(false);
	const [problemNotificationMessage, setProblemNotificationMessage] = useState('');

	const [showTaskNotification, setShowTaskNotification] = useState(false);
	const [taskNotificationMessage, setTaskNotificationMessage] = useState('');

	const [showBlockingNotification, setShowBlockingNotification] = useState(false);
	const [blockingNotificationMessage, setBlockingNotificationMessage] = useState('');

	const [showResolveProblemsNotification, setShowResolveProblemsNotification] = useState(false);

	const [previousItem, setPreviousItem] = useState(null);

	useBudgetTimeHistory({
		budget,
		time,
		expectedBudget,
		expectedTime,
		setBudgetTimeHistory,
	});

	useNotifications({
		problemQueue,
		setProblemQueue,
		showProblemNotification,
		setShowProblemNotification,
		setProblemNotificationMessage,

		taskQueue,
		setTaskQueue,
		showTaskNotification,
		setShowTaskNotification,
		setTaskNotificationMessage,
	});

	useUnexpectedTasks({
		columns,
		tasks,
		solvedTasks,
		unexpectedTasksData,
		unexpectedTasks,
		setUnexpectedTasks,
		taskQueue,
		setTaskQueue,
		stagesWithUnexpectedAdded,
		setStagesWithUnexpectedAdded,
	});

	useNextTaskSelection({
		columns,
		tasks,
		solvedTasks,
		dynamicProblems,
		solvedProblems,
		dispatch,
		selectedTask,
		selectedProblem,
		showProblemNotification,
		showBlockingNotification,
		setShowBlockingNotification,
		setBlockingNotificationMessage,
		unexpectedTasks,
	});

	useGameFlow({
		columns,
		tasks,
		solvedTasks,
		solvedProblems,
		dynamicProblems,
		problems,
		addedProblems,
		dispatch,
		setNewProblemJustAdded,
		stagesWithProblemsAdded,
		setStagesWithProblemsAdded,
		setProblemQueue,
		newProblemJustAdded,
		unexpectedTasks,
		customerDissatisfaction,
		budget,
		time,
		selectedProblem,
		setShowResolveProblemsNotification,
		showResolveProblemsNotification
	  });

	const {
		handleDecision,
		handleSelectProblem,
		handleCloseProblemNotification,
		handleCloseTaskNotification,
		handleRestart,
	} = useHandlers({
		dispatch,
		tasks,
		setTasks,
		selectedTask,
		selectedProblem,
		calculateCost,
		budget,
		setBudget,
		applyDecision,
		addSolvedTask,
		addSolvedProblem,
		setSelectedTask,
		setSelectedProblem,
		restartGame,
		initialTasks,
		setUnexpectedTasks,
		setProblemQueue,
		setStagesWithUnexpectedAdded,
		setStagesWithProblemsAdded,
		setShowBlockingNotification,
		setBlockingNotificationMessage,
		setBudgetTimeHistory,
		previousItem,
		setPreviousItem,
		setShowProblemNotification,
		setShowTaskNotification,
	});

	return {
		columns,
		budget,
		time,
		expectedBudget,
		expectedTime,
		solvedTasks,
		solvedProblems,
		selectedTask,
		selectedProblem,
		dynamicProblems,
		showProblemNotification,
		problemNotificationMessage,
		showBlockingNotification,
		blockingNotificationMessage,
		unexpectedTasks,
		customerDissatisfaction,
		dialogOpen,
		dialogMessage,
		budgetTimeHistory,

		showResolveProblemsNotification,
		setShowResolveProblemsNotification,

		showTaskNotification,
		taskNotificationMessage,
		handleCloseTaskNotification,

		handleDecision,
		handleSelectProblem,
		handleCloseProblemNotification,
		handleRestart,
	};
}
