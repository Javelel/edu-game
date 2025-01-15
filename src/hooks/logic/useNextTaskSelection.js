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
    if (
      !selectedTask && 
      !showProblemNotification && 
      !selectedProblem && 
      !showBlockingNotification
    ) {
      if (allTasksSolvedForStage('Testy', tasks, solvedTasks, unexpectedTasks)) {
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
          return;
        }
      }
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

function allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks) {
  const baseTasks = tasks[stage] || [];
  const allBaseSolved = baseTasks.every((task) =>
    solvedTasks.some((st) => st.taskId === task.id)
  );

  const unexpectedInStage = unexpectedTasks.filter((ut) => ut.solveStage === stage);
  const allUnexpectedSolved = unexpectedInStage.every((ut) =>
    solvedTasks.some((st) => st.taskId === ut.id)
  );

  return allBaseSolved && allUnexpectedSolved;
}
