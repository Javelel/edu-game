export function getNextUnsolvedTaskWithUnexpected(
	columns,
	tasks,
	solvedTasks,
	unexpectedTasks,
	startIndex = 0
  ) {
	if (startIndex >= columns.length) {
	  return null;
	}
  
	const currentStage = columns[startIndex];
	
	// A. Zadania główne
	const mainTasks = tasks[currentStage] || [];
	const unsolvedMainTasks = mainTasks.filter(
	  (task) => !solvedTasks.some((st) => st.taskId === task.id)
	);
	if (unsolvedMainTasks.length > 0) {
	  return unsolvedMainTasks[0];
	}
  
	// B. Zadania nieprzewidziane
	const currentStageIndex = columns.indexOf(currentStage);
	const isStageFinished = (stageName) => {
	  const tasksInThatStage = tasks[stageName] || [];
	  return tasksInThatStage.every((t) =>
		solvedTasks.some((st) => st.taskId === t.id)
	  );
	};
  
	const unexpectedTasksForSolveStage = unexpectedTasks.filter((ut) => {
	  if (ut.solveStage !== currentStage) return false;
	  const utStageIndex = columns.indexOf(ut.stage);
	  const canBeSolvedNow = utStageIndex <= currentStageIndex && isStageFinished(ut.stage);
	  return canBeSolvedNow;
	});
  
	const unsolvedUnexpected = unexpectedTasksForSolveStage.filter(
	  (ut) => !solvedTasks.some((st) => st.taskId === ut.id)
	);
	if (unsolvedUnexpected.length > 0) {
	  return unsolvedUnexpected[0];
	}
  
	// C. Jeśli brak zadań w tym etapie, przechodzimy do kolejnego
	return getNextUnsolvedTaskWithUnexpected(
	  columns,
	  tasks,
	  solvedTasks,
	  unexpectedTasks,
	  startIndex + 1
	);
  }
  
  export function calculateCost(cost) {
	if (typeof cost === 'number') return cost;
  
	const parts = cost.split('+');
	let total = 0;
  
	for (const part of parts) {
	  if (part.includes('k6')) {
		const multiplier = parseInt(part.replace('k6', ''), 10) || 1;
		total += multiplier * Math.floor(Math.random() * 6 + 1);
	  } else {
		total += parseInt(part, 10);
	  }
	}
	return total;
  }
  