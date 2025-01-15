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
} from '../../redux/reducers/gameReducer';

import { tasks as initialTasks } from '../../data/tasks';
import { unexpectedTasks as unexpectedTasksData } from '../../data/unexpectedTasks';
import { problems } from '../../data/problems';

import { getNextUnsolvedTaskWithUnexpected, calculateCost } from '../../utils/taskHelpers';

// Sub-hooki:
import useBudgetTimeHistory from './useBudgetTimeHistory';
import useNotifications from './useNotifications';
import useNextTaskSelection from './useNextTaskSelection';
import useUnexpectedTasks from './useUnexpectedTasks';
import useProblems from './useProblems';
import useCompletionCheck from './useCompletionCheck';
import useHandlers from './useHandlers';

const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];

export default function useGameLogic() {
  const dispatch = useDispatch();

  // Pobranie z Redux
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

  // Lokalne stany
  const [tasks, setTasks] = useState({ ...initialTasks });
  const [unexpectedTasks, setUnexpectedTasks] = useState([]);
  
  const [stagesWithUnexpectedAdded, setStagesWithUnexpectedAdded] = useState([]);
  const [stagesWithProblemsAdded, setStagesWithProblemsAdded] = useState([]);
  
  // Historia budżetu i czasu
  const [budgetTimeHistory, setBudgetTimeHistory] = useState([
    { budget, time, expectedBudget, expectedTime }
  ]);

  // Stan do rozpoznania, czy świeżo dodano problem
  const [newProblemJustAdded, setNewProblemJustAdded] = useState(false);

  // --- Notyfikacje i ich kolejki ---
  const [problemQueue, setProblemQueue] = useState([]);
  const [taskQueue, setTaskQueue] = useState([]);

  // --- Kontrolki notyfikacji ---
  const [showProblemNotification, setShowProblemNotification] = useState(false);
  const [problemNotificationMessage, setProblemNotificationMessage] = useState('');

  const [showTaskNotification, setShowTaskNotification] = useState(false);
  const [taskNotificationMessage, setTaskNotificationMessage] = useState('');

  const [showBlockingNotification, setShowBlockingNotification] = useState(false);
  const [blockingNotificationMessage, setBlockingNotificationMessage] = useState('');

  const [showResolveProblemsNotification, setShowResolveProblemsNotification] = useState(false);

  // Zapamiętanie poprzedniego itemu (task / problem)
  const [previousItem, setPreviousItem] = useState(null);

  // --- Hook odpowiedzialny za historię budżetu/czasu ---
  useBudgetTimeHistory({
    budget,
    time,
    expectedBudget,
    expectedTime,
    setBudgetTimeHistory,
  });

  // --- Hook do obsługi notyfikacji (kolejki) ---
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

  // --- Hook do dodawania zadań nieprzewidzianych ---
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

  // --- Hook do wyboru następnego zadania ---
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

  // --- Hook do obsługi problemów (pojawianie się, kolejka, itp.) ---
  useProblems({
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
    setDialog,
  });

  // --- Hook do sprawdzania warunków końca gry, itp. ---
  useCompletionCheck({
    columns,
    tasks,
    solvedTasks,
    solvedProblems,
    dynamicProblems,
    unexpectedTasks,
    selectedProblem,
    setShowResolveProblemsNotification,
    showResolveProblemsNotification,
    dispatch,
  });

  // --- Handlery: decyzje, restart, wybór problemu, itp. ---
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
