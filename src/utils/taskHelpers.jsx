export const getNextUnsolvedTask = (columns, tasks, solvedTasks) => {
	for (let category of columns) {
	  const categoryTasks = tasks[category] || [];
	  for (let task of categoryTasks) {
		if (!solvedTasks.some(solvedTask => solvedTask.taskId === task.id)) {
			return task;
		  }
	  }
	}
	return null;
  };

  export function getNextUnsolvedTaskWithUnexpected(
	columns,
	tasks,
	solvedTasks,
	unexpectedTasks,
	startIndex = 0,
  ) {
	// Jeśli wyszliśmy poza zakres etapów - nie ma kolejnego zadania
	if (startIndex >= columns.length) {
	  return null;
	}
  
	const currentStage = columns[startIndex];
  
	// 1. Sprawdź, czy Implementacja już skończona
	const isImplementationDone = tasks["Implementacja"]?.every(task =>
	  solvedTasks.some(st => st.taskId === task.id)
	);
  
	// A. Najpierw główne zadania
	const unsolvedMainTasks = tasks[currentStage]?.filter(
	  task => !solvedTasks.some(st => st.taskId === task.id)
	) || [];
	if (unsolvedMainTasks.length > 0) {
	  return unsolvedMainTasks[0];
	}
  
	// B. Zadania nieprzewidziane z bieżącego etapu
	const unsolvedUnexpected = unexpectedTasks
	  .filter(t => t.stage === currentStage)
	  .filter(t => !solvedTasks.some(st => st.taskId === t.id));
  
	// Dodajemy warunek:
	// - Jeśli to NIE jest etap Implementacja
	// - i Implementacja nie jest jeszcze ukończona
	// => Pomijamy te zadania i idziemy dalej
	if (currentStage !== "Implementacja" && !isImplementationDone) {
	  return getNextUnsolvedTaskWithUnexpected(
		columns,
		tasks,
		solvedTasks,
		unexpectedTasks,
		startIndex + 1
	  );
	}
  
	// Jeżeli dotarliśmy tutaj:
	// - Albo jesteśmy w Implementacji
	// - Albo Implementacja jest ukończona
	// => Możemy zwrócić zadania nieprzewidziane
	if (unsolvedUnexpected.length > 0) {
	  return unsolvedUnexpected[0];
	}
  
	// C. Jeśli nic w tym etapie nie ma do zrobienia - dalej
	return getNextUnsolvedTaskWithUnexpected(
	  columns,
	  tasks,
	  solvedTasks,
	  unexpectedTasks,
	  startIndex + 1
	);
  }
  