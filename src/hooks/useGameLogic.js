import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBudget,
  setTime,
  addSolvedTask,
  addSolvedProblem,
  setSelectedTask,
  setSelectedProblem,
  addDynamicProblem,
  setDialog,
  restartGame,
  applyDecision,
} from '../redux/reducers/gameReducer';

import { tasks } from '../data/tasks';
import { problems } from '../data/problems';
import { unexpectedTasks as unexpectedTasksData } from '../data/unexpectedTasks';
import { getNextUnsolvedTaskWithUnexpected } from '../utils/taskHelpers';

// Tutaj trzymasz columns w tym samym pliku (zamiast osobnego pliku)
const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];

export default function useGameLogic() {
  const dispatch = useDispatch();
  const {
    budget,
    time,
    solvedTasks,
    solvedProblems,
    selectedTask,
    selectedProblem,
    dynamicProblems,
    problemChances,
    addedProblems,
    customerDissatisfaction,
    dialogOpen,
    dialogMessage,
  } = useSelector((state) => state.game);

  const [showProblemNotification, setShowProblemNotification] = useState(false);
  const [problemNotificationMessage, setProblemNotificationMessage] = useState('');
  const [previousItem, setPreviousItem] = useState(null);
  const [unexpectedTasks, setUnexpectedTasks] = useState([]);
  const [problemQueue, setProblemQueue] = useState([]);

  // -----------------------------
  // 1. Obsługa wyboru kolejnego zadania (głównego lub nieprzewidzianego)
  // -----------------------------
  useEffect(() => {
    if (!selectedTask && !showProblemNotification && !selectedProblem) {
      const nextTask = getNextUnsolvedTaskWithUnexpected(
        columns,
        tasks,
        solvedTasks,
        unexpectedTasks
      );
      if (nextTask) {
        dispatch(setSelectedTask(nextTask));
      }
    }
  }, [selectedTask, solvedTasks, showProblemNotification, selectedProblem, dispatch, unexpectedTasks]);

  // -----------------------------
  // 2. Obsługa dodawania zadań nieprzewidzianych, gdy etap jest ukończony
  // -----------------------------
  useEffect(() => {
    const allTasksSolvedForStage = (stage) =>
      tasks[stage]?.every(task =>
        solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
      );

    columns.forEach((stage) => {
      if (!tasks[stage]) return;
      if (allTasksSolvedForStage(stage)) {
        const newTasks = unexpectedTasksData.filter(task => task.stage === stage);
        setUnexpectedTasks(prev => {
          const notAddedYet = newTasks.filter(nt => !prev.some(p => p.id === nt.id));
          return [...prev, ...notAddedYet];
        });
      }
    });
  }, [solvedTasks]);

  // -----------------------------
  // 3. Sprawdzanie, czy gra się kończy
  // -----------------------------
  useEffect(() => {
    const allTasksSolved = Object.values(tasks)
      .flat()
      .every(task =>
        solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
      );

    const allDynamicProblemsSolved = dynamicProblems.every(problem =>
      solvedProblems.includes(problem.id)
    );

    if (allTasksSolved && allDynamicProblemsSolved) {
      const message =
        customerDissatisfaction === 0
          ? 'Brawo! Projekt się udał, a klient jest zadowolony.'
          : `Projekt ukończony, ale klient jest niezadowolony: ${customerDissatisfaction} punktów.`;
      dispatch(setDialog({ open: true, message }));
    }
  }, [solvedTasks, solvedProblems, dynamicProblems, customerDissatisfaction, dispatch]);

  useEffect(() => {
    // Jeżeli nie wyświetlamy żadnego powiadomienia, a w kolejce jest coś
    if (!showProblemNotification && problemQueue.length > 0) {
      // Pobieramy pierwszy komunikat
      const nextMessage = problemQueue[0];
      // Ustawiamy go do wyświetlenia
      setProblemNotificationMessage(nextMessage);
      setShowProblemNotification(true);
      // Usuwamy go z kolejki
      setProblemQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [problemQueue, showProblemNotification]);

  // -----------------------------
  // 4. Funkcje pomocnicze
  // -----------------------------
  const rollDice = (sides = 6) => Math.floor(Math.random() * sides + 1);

  const maybeAddNewProblem = () => {
    problems.forEach(problem => {
      if (addedProblems[problem.id]) return;

      const rollResult = rollDice();

      if (problem.condition.requiredDecisionId) {
        const requiredDecision = solvedTasks.some(
          t => t.decisionId === problem.condition.requiredDecisionId
        );
        if (!requiredDecision) return;
      }

      let problemAdded = false;
      if (problem.condition.alwaysOccurs) {
        problemAdded = true;
      } else if (problem.condition.if) {
        // Problem zależny od konkretnej decyzji
        const hasConditionMet = solvedTasks.some(t => t.decisionId === problem.condition.if);
        problemAdded = hasConditionMet
          ? rollResult >= problem.condition.baseChance
          : rollResult >= (problem.condition.elseChance || problem.condition.baseChance);
      } else {
        // Domyślna szansa
        problemAdded = rollResult >= problem.condition.baseChance;
      }

      if (problemAdded) {
        dispatch(addDynamicProblem({ ...problem, isNew: true }));
        setProblemQueue((prevQueue) => [
			...prevQueue,
			`Pojawił się nowy problem: ${problem.name}`
		  ]);
        dispatch(setSelectedTask(null));
        dispatch(setSelectedProblem(null));
      }
    });
  };

  // -----------------------------
  // 5. Handlery
  // -----------------------------
  const handleDecision = (decision) => {
    dispatch(applyDecision(decision));

    if (budget - decision.budgetCost < 0) {
      dispatch(setDialog({ open: true, message: 'Gra zakończona: wyczerpałeś budżet.' }));
      return;
    }
    if (time - decision.timeCost < 0) {
      dispatch(setDialog({ open: true, message: 'Gra zakończona: zabrakło czasu.' }));
      return;
    }

    if (selectedTask) {
      dispatch(addSolvedTask({ taskId: selectedTask.id, decisionId: decision.id }));
      dispatch(setSelectedTask(null));
    } else if (selectedProblem) {
      dispatch(addSolvedProblem(selectedProblem.id));
      dispatch(setSelectedProblem(null));
    }

    if (unexpectedTasks.some(t => t.id === selectedTask?.id)) {
      setUnexpectedTasks(prev => prev.filter(t => t.id !== selectedTask.id));
    }

    maybeAddNewProblem();
  };

  const handleSelectProblem = (problem) => {
    if (!problem) return;
    if (selectedTask) {
      setPreviousItem({ type: 'task', item: selectedTask });
    } else if (selectedProblem) {
      setPreviousItem({ type: 'problem', item: selectedProblem });
    }
    dispatch(setSelectedProblem(problem));
    dispatch(setSelectedTask(null));
  };

  const handleCloseProblemNotification = () => {
    setShowProblemNotification(false);
  };

  const handleRestart = () => {
    dispatch(restartGame());
  };

  // -----------------------------
  // 6. Zwrot danych i funkcji z hooka
  // -----------------------------
  return {
    // columns trzymamy i zwracamy w hooku
    columns,

    // Dane ze store + lokalny stan
    budget,
    time,
    solvedTasks,
    solvedProblems,
    selectedTask,
    selectedProblem,
    dynamicProblems,
    showProblemNotification,
    problemNotificationMessage,
    unexpectedTasks,
    customerDissatisfaction,
    dialogOpen,
    dialogMessage,

    // Funkcje
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleRestart,
  };
}
