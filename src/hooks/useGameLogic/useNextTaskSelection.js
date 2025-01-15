import { useEffect } from 'react';
import { setSelectedTask } from '../../redux/reducers/gameReducer';
import { getNextUnsolvedTaskWithUnexpected } from '../../utils/taskHelpers';

export default function useNextTaskSelection({
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
}) {
  useEffect(() => {
    // Jeżeli nie mamy wybranego taska/problem + nie ma otwartej notyfikacji problemu/blokady
    if (
      !selectedTask && 
      !showProblemNotification && 
      !selectedProblem && 
      !showBlockingNotification
    ) {
      // Sprawdź, czy właśnie skończyliśmy "Testy"
      if (allTasksSolvedForStage('Testy', tasks, solvedTasks, unexpectedTasks)) {
        // Zbadaj, czy są nierozwiązane problemy "Implementacja"
        const unsolvedImplementation = dynamicProblems.filter(
          (p) =>
            p.category === 'Implementacja' &&
            !solvedProblems.some((sp) => sp.problemId === p.id)
        );
        if (unsolvedImplementation.length > 0 && !showProblemNotification) {
          setBlockingNotificationMessage(
            'Aby przejść do Wdrożenia, nie możesz mieć nierozwiązanych problemów: „Słabo zdefiniowany zakres” lub „Niedziałające elementy frameworku”'
          );
          setShowBlockingNotification(true);
          return; // Zatrzymujemy się
        }
      }
      // Pobierz kolejne zadanie (bazowe lub nieprzewidziane)
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
    showBlockingNotification,
    dynamicProblems,
    solvedProblems,
    dispatch,
    tasks,
    columns,
    unexpectedTasks,
    setShowBlockingNotification,
    setBlockingNotificationMessage,
  ]);
}

/**
 * Sprawdza, czy wszystkie zadania (bazowe + nieprzewidziane) w danym etapie są rozwiązane
 */
function allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks) {
  // Bazowe zadania
  const baseTasks = tasks[stage] || [];
  const allBaseSolved = baseTasks.every((task) =>
    solvedTasks.some((st) => st.taskId === task.id)
  );

  // Nieprzewidziane zadania w tym etapie
  const unexpectedInStage = unexpectedTasks.filter((ut) => ut.solveStage === stage);
  const allUnexpectedSolved = unexpectedInStage.every((ut) =>
    solvedTasks.some((st) => st.taskId === ut.id)
  );

  return allBaseSolved && allUnexpectedSolved;
}
