import { useEffect } from 'react';

export default function useUnexpectedTasks({
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
}) {
  useEffect(() => {
    columns.forEach((stage) => {
      if (!tasks[stage]) return;

      // Sprawdzamy, czy wszystkie bazowe zadania w tym etapie są ukończone
      const allBaseSolved = tasks[stage].every((task) =>
        solvedTasks.some((st) => st.taskId === task.id)
      );
      if (allBaseSolved && !stagesWithUnexpectedAdded.includes(stage)) {
        // Dodajemy zadania nieprzewidziane dla danego etapu
        const newTasks = unexpectedTasksData.filter((task) => task.stage === stage);
        // Filtrujemy tylko te, których jeszcze nie ma w 'unexpectedTasks'
        const notAddedYet = newTasks.filter(
          (nt) => !unexpectedTasks.some((u) => u.id === nt.id)
        );

        if (notAddedYet.length > 0) {
          const taskNames = notAddedYet.map((t) => t.name).join(', ');
          // Dodajemy do kolejki powiadomień
          setTaskQueue((prevQueue) => [
            ...prevQueue,
            `Pojawiły się nowe zadania dla etapu ${stage}: ${taskNames}`,
          ]);
        }

        setUnexpectedTasks((prev) => [...prev, ...notAddedYet]);
        setStagesWithUnexpectedAdded((prev) => [...prev, stage]);
      }
    });
  }, [
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
  ]);
}
