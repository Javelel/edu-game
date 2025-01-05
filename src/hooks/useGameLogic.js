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
import { getNextUnsolvedTaskWithUnexpected, calculateCost } from '../utils/taskHelpers';

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
	const [showBlockingNotification, setShowBlockingNotification] = useState(false);
	const [blockingNotificationMessage, setBlockingNotificationMessage] = useState('');
	const [stagesWithUnexpectedAdded, setStagesWithUnexpectedAdded] = useState([]);
	const [stagesWithProblemsAdded, setStagesWithProblemsAdded] = useState([]);
	const [taskQueue, setTaskQueue] = useState([]);
	const [showTaskNotification, setShowTaskNotification] = useState(false);
	const [taskNotificationMessage, setTaskNotificationMessage] = useState('');
	const [showResolveProblemsNotification, setShowResolveProblemsNotification] = useState(false);

	// Helper: rzut kostką
	const rollDice = (sides = 6) => Math.floor(Math.random() * sides + 1);

	// 1. Obsługa wyboru kolejnego zadania
	useEffect(() => {
		// Jeśli nie mamy wybranego zadania, problemu ani powiadomienia...
		if (!selectedTask && !showProblemNotification && !selectedProblem && !showBlockingNotification) {
			// Sprawdzamy, czy właśnie skończyliśmy etap "Testy"
			const testyDone = allTasksSolvedForStage('Testy');
			if (testyDone) {
				// Szukamy nierozwiązanych problemów implementacyjnych
				const unsolvedImplementation = dynamicProblems.filter(
					(p) =>
						p.category === 'Implementacja' &&
						!solvedProblems.some((sp) => sp.problemId === p.id)
				);
				if (unsolvedImplementation.length > 0 && !showProblemNotification) {
					setBlockingNotificationMessage(
						'Aby przejdziesz do Wdrożenia nie możesz mieć nierozwiązanych problemów: „Słabo zdefiniowany zakres” lub „Niedziałające elementy frameworku”'
					);
					setShowBlockingNotification(true);
					// Przerywamy dalsze pobieranie kolejnego zadania
					return;
				}
			}
			// Jeśli testy są zrobione i nie mamy blokujących problemów...
			// dopiero teraz pobieramy kolejne zadanie
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
	]);

	const allTasksSolvedForStage = (stage) => {
		// (A) Wszystkie bazowe zadania?
		const baseTasksSolved = tasks[stage]?.every(task =>
			solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
		);

		// (B) Wszystkie nieprzewidziane zadania?
		const unexpectedTasksForStage = unexpectedTasks.filter(task => task.solveStage === stage);
		const unexpectedSolved = unexpectedTasksForStage.every(ut =>
			solvedTasks.some(solvedTask => solvedTask.taskId === ut.id)
		);

		return baseTasksSolved && unexpectedSolved;
	};

	const baseTasksSolvedForStage = (stage) => {
		return tasks[stage]?.every(task =>
			solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
		);
	};

	const shouldProblemAppear = (problem, solvedTasks) => {
		// 1. Jeżeli problem został już dodany – pomijamy
		if (addedProblems[problem.id]) return false;
	  
		// 2. Wyliczamy próg (chanceThreshold) – zaczynamy od baseChance
		let chanceThreshold = problem.condition?.baseChance || 0;
	  
		// 3. Dodajemy (lub odejmujemy) modyfikatory na podstawie tego,
		//    które decyzje zostały podjęte (zawarte w solvedTasks).
		if (Array.isArray(problem.condition?.modifiers)) {
		  problem.condition.modifiers.forEach(mod => {
			const hasModifierDecision = solvedTasks.some(
			  t => t.decisionId === mod.source
			);
			if (hasModifierDecision) {
			  chanceThreshold += mod.adjustment;
			}
		  });
		}
	  
		// 4. Rzut kostką (zakładamy kostkę 6-ścienną)
		const dice = rollDice(); // wyniki 1–6
	  
		// 5. Jeśli wyrzucone oczka są >= chanceThreshold, to problem się pojawia
		return dice >= chanceThreshold;
	  };

	// 2. Obsługa ETAPÓW – osobno dołożenie zadań nieprzewidzianych i osobno problemów
// (A) useEffect do DODAWANIA ZADAŃ NIEPRZEWIDZIANYCH
useEffect(() => {
	columns.forEach((stage) => {
	  if (!tasks[stage]) return;
	  
	  // Czy bazowe zadania w tym etapie są ukończone?
	  const baseTasksDone = baseTasksSolvedForStage(stage);
	  if (
		baseTasksDone &&
		!stagesWithUnexpectedAdded.includes(stage) // jeśli jeszcze nie dodaliśmy
	  ) {
		const newTasks = unexpectedTasksData.filter((task) => task.stage === stage);
		setUnexpectedTasks((prev) => {
		  const notAddedYet = newTasks.filter((nt) => !prev.some((p) => p.id === nt.id));
		  if (notAddedYet.length > 0) {
			const taskNames = notAddedYet.map(t => t.name).join(', ');
			setTaskQueue((prevQueue) => [
			  ...prevQueue,
			  `Pojawiły się nowe zadania dla etapu ${stage}: ${taskNames}`
			]);
		  }
		  return [...prev, ...notAddedYet];
		});
		setStagesWithUnexpectedAdded((prev) => [...prev, stage]);
	  }
	});
  }, [
	columns,
	solvedTasks,
	stagesWithUnexpectedAdded,
  ]);

  useEffect(() => {
	// Jeśli nie wyświetlamy aktualnie powiadomienia o zadaniach i mamy coś w kolejce...
	if (!showTaskNotification && taskQueue.length > 0) {
	  const nextMessage = taskQueue[0];
	  setTaskNotificationMessage(nextMessage);
	  setShowTaskNotification(true);
	  // usuwamy pierwszy element z kolejki
	  setTaskQueue((prevQueue) => prevQueue.slice(1));
	}
  }, [taskQueue, showTaskNotification]);
  
  // 4. Handler do zamykania powiadomienia
  const handleCloseTaskNotification = () => {
	setShowTaskNotification(false);
  };
  
  
  
  // (B) useEffect do DODAWANIA PROBLEMÓW
  useEffect(() => {
	columns.forEach((stage) => {
	  if (!tasks[stage]) return;
  
	  // Czy w tym etapie ukończono wszystkie (bazowe + niespodziewane) zadania?
	  const allTasksDone = allTasksSolvedForStage(stage);
  
	  if (
		allTasksDone &&
		!stagesWithProblemsAdded.includes(stage) // jeśli jeszcze nie dodaliśmy problemów
	  ) {
		const newProblemsForStage = []; // Tymczasowa lista dla nowych problemów
  
		problems.forEach((problem) => {
		  if (problem.category === stage) {
			if (shouldProblemAppear(problem, solvedTasks)) {
			  // Dodajemy problem do store
			  dispatch(addDynamicProblem({ ...problem, isNew: true }));
  
			  // Dodajemy problem do tymczasowej listy
			  newProblemsForStage.push(problem.name);
  
			  // (opcjonalnie) resetujemy ewentualnie wybrane zadanie / problem
			  dispatch(setSelectedTask(null));
			  dispatch(setSelectedProblem(null));
			}
		  }
		});
  
		// Jeśli są nowe problemy, dodajemy jedno powiadomienie
		if (newProblemsForStage.length > 0) {
		  setProblemQueue((prevQueue) => [
			...prevQueue,
			`Nowe problemy w etapie "${stage}": ${newProblemsForStage.join(', ')}`,
		  ]);
		}
  
		// Oznaczamy, że problemy dla tego etapu zostały już dodane
		setStagesWithProblemsAdded((prev) => [...prev, stage]);
	  }
	});
  }, [
	columns,
	solvedTasks,
	unexpectedTasks,
	stagesWithProblemsAdded,
	dispatch,
  ]);
  

  useEffect(() => {
	// (1) Sprawdzamy, czy WSZYSTKIE zadania (bazowe + nieprzewidziane) są solved
	const allTasksSolved = Object.values(tasks)
	  .flat()
	  .every((task) =>
		solvedTasks.some((solvedTask) => solvedTask.taskId === task.id)
	  );
  
	const allUnexpectedTasksSolved = unexpectedTasks.every((uTask) =>
	  solvedTasks.some((solvedTask) => solvedTask.taskId === uTask.id)
	);
  
	const allTasksReallySolved = allTasksSolved && allUnexpectedTasksSolved;
  
	// (2) Sprawdzamy, czy istnieją problem(y), które NIE są rozwiązane
	const anyProblemsUnsolved = dynamicProblems.some(
	  (problem) => !solvedProblems.some((sp) => sp.problemId === problem.id)
	);
  
	// (3) Jeśli wszystkie zadania zrobione, a problemy jeszcze są – pokazujemy powiadomienie
	if (allTasksReallySolved && anyProblemsUnsolved && !selectedProblem) {
	  setShowResolveProblemsNotification(true);
	} else {
	  // Gdy warunek nie jest spełniony, chowamy powiadomienie
	  setShowResolveProblemsNotification(false);
	}
  }, [solvedTasks, solvedProblems, dynamicProblems, unexpectedTasks, selectedTask, selectedProblem]);
  

	// 3. Sprawdzanie, czy gra się kończy
	useEffect(() => {
		const allTasksSolved = Object.values(tasks)
			.flat()
			.every(task => solvedTasks.some(solvedTask => solvedTask.taskId === task.id));

			const allDynamicProblemsSolved = dynamicProblems.every(problem =>
				solvedProblems.some(solvedProblem => solvedProblem.problemId === problem.id)
			  );

		if (allTasksSolved && allDynamicProblemsSolved) {
			console.log(solvedProblems);
			const message = `Projekt ukończony, 
				\nniezadowolenie klienta: ${customerDissatisfaction}
				\nbudżet: ${budget}
				\nczas: ${time}`;
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
		const budgetCost = calculateCost(decision.budgetCost);
    	const timeCost   = calculateCost(decision.timeCost);

		dispatch(applyDecision(decision));

		if (selectedTask) {
			dispatch(addSolvedTask({
				taskId: selectedTask.id,
				decisionId: decision.id,
				decisionName: decision.name,
				actualBudgetCost: budgetCost,
            	actualTimeCost: timeCost,
			}));
			dispatch(setSelectedTask(null));
		} else if (selectedProblem) {
			dispatch(addSolvedProblem({
				problemId: selectedProblem.id,
				decisionName: decision.name,
				actualBudgetCost: budgetCost,
      			actualTimeCost: timeCost,
			}));
			dispatch(setSelectedProblem(null));
		}
	};

	const handleSelectProblem = (problem) => {
		if (!problem) return;

		// Jeśli aktualnie mamy włączone powiadomienie blokujące, wyłącz je
		if (showBlockingNotification) {
			setShowBlockingNotification(false);
		}
		// Jeśli mamy włączone powiadomienie zwykłe (o nowym problemie), także je wyłącz
		if (showProblemNotification) {
			setShowProblemNotification(false);
		}

		// zapamiętanie, co było wybrane
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
		setUnexpectedTasks([]);
		setProblemQueue([]);
		setStagesWithUnexpectedAdded([]);
		setStagesWithProblemsAdded([]);
		setShowBlockingNotification(false);
		setBlockingNotificationMessage('');
	};

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
		showBlockingNotification,
		blockingNotificationMessage,

		unexpectedTasks,
		customerDissatisfaction,
		dialogOpen,
		dialogMessage,

		showResolveProblemsNotification,
  		setShowResolveProblemsNotification,

		showTaskNotification,
  		taskNotificationMessage,
  		handleCloseTaskNotification,

		handleDecision,
		handleSelectProblem,
		handleCloseProblemNotification,
		handleRestart,
	};
}
