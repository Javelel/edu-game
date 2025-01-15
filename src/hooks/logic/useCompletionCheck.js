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
    const allMainTasksSolved = Object.values(tasks)
      .flat()
      .every((task) => solvedTasks.some((st) => st.taskId === task.id));
    const allUnexpectedTasksSolved = unexpectedTasks.every((ut) =>
      solvedTasks.some((st) => st.taskId === ut.id)
    );
    const allTasksReallySolved = allMainTasksSolved && allUnexpectedTasksSolved;

    const anyProblemUnsolved = dynamicProblems.some(
      (p) => !solvedProblems.some((sp) => sp.problemId === p.id)
    );

    if (allTasksReallySolved && anyProblemUnsolved && !selectedProblem) {
      setShowResolveProblemsNotification(true);
    } else {
      if (showResolveProblemsNotification) {
        setShowResolveProblemsNotification(false);
      }
    }

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
