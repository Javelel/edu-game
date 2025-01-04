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

  /**
   * Stan pomocniczy — etapy, dla których dodano już
   * (1) zadania niespodziewane,
   * (2) problemy.
   */
  const [stagesWithUnexpectedAdded, setStagesWithUnexpectedAdded] = useState([]);
  const [stagesWithProblemsAdded, setStagesWithProblemsAdded] = useState([]);

  // Helper: rzut kostką
  const rollDice = (sides = 6) => Math.floor(Math.random() * sides + 1);

  // 1. Obsługa wyboru kolejnego zadania
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
  }, [
    selectedTask,
    solvedTasks,
    showProblemNotification,
    selectedProblem,
    dispatch,
    unexpectedTasks
  ]);

  /**
   * Funkcja sprawdzająca, czy WSZYSTKIE zadania bazowe + nieprzewidziane
   * w danym etapie są rozwiązane.
   */
  const allTasksSolvedForStage = (stage) => {
    // (A) Wszystkie bazowe zadania?
    const baseTasksSolved = tasks[stage]?.every(task =>
      solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
    );

    // (B) Wszystkie nieprzewidziane zadania?
    const unexpectedTasksForStage = unexpectedTasks.filter(task => task.stage === stage);
    const unexpectedSolved = unexpectedTasksForStage.every(ut =>
      solvedTasks.some(solvedTask => solvedTask.taskId === ut.id)
    );

    return baseTasksSolved && unexpectedSolved;
  };

  /**
   * Funkcja sprawdzająca, czy WSZYSTKIE bazowe zadania w etapie są ukończone.
   * (czyli warunek potrzebny do dołożenia zadań nieprzewidzianych)
   */
  const baseTasksSolvedForStage = (stage) => {
    return tasks[stage]?.every(task =>
      solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
    );
  };

  // 2. Obsługa ETAPÓW – osobno dołożenie zadań nieprzewidzianych i osobno problemów
  useEffect(() => {
    columns.forEach((stage) => {
      if (!tasks[stage]) return;

      // 2.1. Dodawanie zadań nieprzewidzianych (jeśli bazowe zadania są zakończone)
      const baseTasksDone = baseTasksSolvedForStage(stage);
      if (
        baseTasksDone &&
        !stagesWithUnexpectedAdded.includes(stage) // jeszcze nie dodaliśmy do tego etapu
      ) {
        // Dodajemy 'nieprzewidziane' z pliku unexpectedTasksData
        const newTasks = unexpectedTasksData.filter(task => task.stage === stage);
        setUnexpectedTasks(prev => {
          const notAddedYet = newTasks.filter(nt => !prev.some(p => p.id === nt.id));
          return [...prev, ...notAddedYet];
        });

        // Oznaczamy, że zadania nieprzewidziane dla tego etapu zostały już dodane
        setStagesWithUnexpectedAdded(prev => [...prev, stage]);
      }

      // 2.2. Dodawanie problemów (jeśli WSZYSTKIE — i bazowe, i nieprzewidziane — zadania są zakończone)
      const allTasksDone = allTasksSolvedForStage(stage);
      if (
        allTasksDone &&
        !stagesWithProblemsAdded.includes(stage) // jeszcze nie dodaliśmy problemów do tego etapu
      ) {
        problems.forEach(problem => {
          if (problem.category === stage) {
            if (addedProblems[problem.id]) return; // już wcześniej dodany?

            const {
              requiredDecisionId,
              alwaysOccurs,
              if: conditionIf,
              baseChance,
              elseChance,
            } = problem.condition || {};

            // Sprawdź ewentualny requiredDecisionId
            if (requiredDecisionId) {
              const decisionWasMade = solvedTasks.some(t => t.decisionId === requiredDecisionId);
              if (!decisionWasMade) return; 
            }

            // Rzut kostką
            let rollThreshold = baseChance || 3; 
            if (alwaysOccurs) {
              rollThreshold = 0; 
            } else if (conditionIf) {
              const conditionMet = solvedTasks.some(t => t.decisionId === conditionIf);
              rollThreshold = conditionMet ? baseChance : elseChance || baseChance;
            }

            const dice = rollDice();
            if (dice >= rollThreshold) {
              dispatch(addDynamicProblem({ ...problem, isNew: true }));
              setProblemQueue(prevQueue => [
                ...prevQueue,
                `Pojawił się nowy problem: ${problem.name}`,
              ]);
            }
          }
        });

        // Oznaczamy, że problemy dla tego etapu zostały już dodane
        setStagesWithProblemsAdded(prev => [...prev, stage]);
      }
    });
  }, [
    columns,
    solvedTasks,
    unexpectedTasks,
    addedProblems,
    stagesWithUnexpectedAdded,
    stagesWithProblemsAdded,
    dispatch
  ]);

  // 3. Sprawdzanie, czy gra się kończy
  useEffect(() => {
    const allTasksSolved = Object.values(tasks)
      .flat()
      .every(task => solvedTasks.some(solvedTask => solvedTask.taskId === task.id));

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

  // 4. Obsługa kolejki powiadomień o problemach
  useEffect(() => {
    if (!showProblemNotification && problemQueue.length > 0) {
      const nextMessage = problemQueue[0];
      setProblemNotificationMessage(nextMessage);
      setShowProblemNotification(true);
      setProblemQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [problemQueue, showProblemNotification]);

  // 5. Handlery
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
      dispatch(addSolvedTask({
        taskId: selectedTask.id,
        decisionId: decision.id,
        decisionName: decision.name,
      }));
      dispatch(setSelectedTask(null));
    } else if (selectedProblem) {
      dispatch(addSolvedProblem({
        problemId: selectedProblem.id,
        decisionName: decision.name,
      }));
      dispatch(setSelectedProblem(null));
    }
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
    // Przy restarcie możesz też wyczyścić local state
    setUnexpectedTasks([]);
    setProblemQueue([]);
    setStagesWithUnexpectedAdded([]);
    setStagesWithProblemsAdded([]);
  };

  // 6. Zwrot danych i funkcji z hooka
  return {
    columns,
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

    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleRestart,
  };
}
