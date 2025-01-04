export function getNextUnsolvedTaskWithUnexpected(
	columns,
	tasks,
	solvedTasks,
	unexpectedTasks,
	startIndex = 0
  ) {
	// 1. Jeśli wyszliśmy poza zakres etapów – nie ma kolejnego zadania.
	if (startIndex >= columns.length) {
	  return null;
	}
  
	const currentStage = columns[startIndex];
  
	// ----------------------
	// KROK A: SPRAWDŹ, CZY SĄ GŁÓWNE ZADANIA W currentStage
	// ----------------------
	const mainTasks = tasks[currentStage] || [];
	const unsolvedMainTasks = mainTasks.filter(
	  (task) => !solvedTasks.some((st) => st.taskId === task.id)
	);
  
	// Jeżeli w bieżącej kolumnie zostały jeszcze główne zadania:
	// zwracamy pierwsze i kończymy (to jest priorytet #1)
	if (unsolvedMainTasks.length > 0) {
	  return unsolvedMainTasks[0];
	}
  
	// ----------------------
	// KROK B: SPRAWDŹ, CZY SĄ ZADANIA NIEPRZEWIDZIANE DO ROZWIĄZANIA W currentStage
	// ----------------------
	const currentStageIndex = columns.indexOf(currentStage);
  
	// Dla wygody sprawdzamy, czy wszystkie główne zadania w "stage" danego 
	// zadania nieprzewidzianego zostały ukończone – wtedy możemy uznać, 
	// że to zadanie "pojawiło się" i jest możliwe do rozwiązywania.
	const isStageFinished = (stageName) => {
	  const tasksInThatStage = tasks[stageName] || [];
	  const allMainDone = tasksInThatStage.every((t) =>
		solvedTasks.some((st) => st.taskId === t.id)
	  );
	  return allMainDone;
	};
  
	// Zadania do rozwiązania w tym etapie to te, które:
	//  - Mają solveStage === currentStage (tutaj *rozwiązujemy*),
	//  - Ich "bazowe" stage jest już skończone (lub równe currentStage – zależnie od potrzeb).
	//    Najczęściej chcesz: columns.indexOf(ut.stage) < currentStageIndex
	//    ALBO (ut.stage === currentStage) => wtedy zadanie pojawiło się w trakcie 
	//    i też chcemy je tu rozwiązać po głównych zadaniach.
	const unexpectedTasksForSolveStage = unexpectedTasks.filter((ut) => {
	  // Sprawdzamy, czy w ogóle "chce" być rozwiązane w tym etapie:
	  if (ut.solveStage !== currentStage) {
		return false;
	  }
  
	  // Czy etap, w którym to zadanie się "pojawia", jest już ukończony
	  // (lub jest właśnie tym etapem)? 
	  // Jeżeli chcesz, by zadanie mogło się rozwiązywać w tym samym momencie, 
	  // co jest jego stage, użyj <=. Jeżeli dopiero w kolejnym – użyj <.
	  const utStageIndex = columns.indexOf(ut.stage);
	  // Zakładam tu, że wystarczy utStageIndex <= currentStageIndex
	  // i jednocześnie "main tasks" w ut.stage są solved.
	  const canBeSolvedNow =
		utStageIndex <= currentStageIndex && isStageFinished(ut.stage);
  
	  return canBeSolvedNow;
	});
  
	// Teraz bierzemy z nich takie, które jeszcze nie są solved:
	const unsolvedUnexpected = unexpectedTasksForSolveStage.filter(
	  (ut) => !solvedTasks.some((st) => st.taskId === ut.id)
	);
  
	// Jeżeli mamy jeszcze zadania nieprzewidziane w tym etapie – zwróć pierwsze
	if (unsolvedUnexpected.length > 0) {
	  return unsolvedUnexpected[0];
	}
  
	// ----------------------
	// KROK C: JEŚLI TUTAJ TRAFIMY, 
	// to znaczy, że w aktualnym etapie nie ma już zadań 
	// (ani głównych, ani nieprzewidzianych do rozwiązania).
	// Przechodzimy do kolejnego etapu.
	// ----------------------
	return getNextUnsolvedTaskWithUnexpected(
	  columns,
	  tasks,
	  solvedTasks,
	  unexpectedTasks,
	  startIndex + 1
	);
  }