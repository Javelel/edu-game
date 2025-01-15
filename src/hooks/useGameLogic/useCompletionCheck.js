import { useEffect } from 'react';
import { setDialog } from '../../redux/reducers/gameReducer';

export default function useCompletionCheck({
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
  budget,
  time,
  customerDissatisfaction,
}) {
  useEffect(() => {
    // (1) Czy wszystkie zadania (bazowe + nieprzewidziane) są rozwiązane?
    const allMainTasksSolved = Object.values(tasks)
      .flat()
      .every((task) => solvedTasks.some((st) => st.taskId === task.id));
    const allUnexpectedTasksSolved = unexpectedTasks.every((ut) =>
      solvedTasks.some((st) => st.taskId === ut.id)
    );
    const allTasksReallySolved = allMainTasksSolved && allUnexpectedTasksSolved;

    // (2) Czy istnieją nierozwiązane problemy?
    const anyProblemUnsolved = dynamicProblems.some(
      (p) => !solvedProblems.some((sp) => sp.problemId === p.id)
    );

    // (2A) Jeśli wszystkie zadania zrobione, a problemy są – wyświetl powiadomienie
    if (allTasksReallySolved && anyProblemUnsolved && !selectedProblem) {
      setShowResolveProblemsNotification(true);
    } else {
      if (showResolveProblemsNotification) {
        setShowResolveProblemsNotification(false);
      }
    }

    // (2B) Jeśli wszystkie zadania i wszystkie problemy rozwiązane — koniec gry
    if (allTasksReallySolved && !anyProblemUnsolved) {
      const message = {
        budget,
        time,
        customerDissatisfaction,
      };
      dispatch(setDialog({ open: true, message }));
    }
  }, [
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
    budget,
    time,
    customerDissatisfaction,
  ]);
}
