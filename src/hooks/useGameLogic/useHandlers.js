import { calculateCost } from '../../utils/taskHelpers';

export default function useHandlers({
  dispatch,
  tasks,
  setTasks,
  selectedTask,
  selectedProblem,
  budget,
  setBudget,
  applyDecision,
  addSolvedTask,
  addSolvedProblem,
  setSelectedTask,
  setSelectedProblem,
  restartGame,
  initialTasks,
  setUnexpectedTasks,
  setProblemQueue,
  setStagesWithUnexpectedAdded,
  setStagesWithProblemsAdded,
  setShowBlockingNotification,
  setBlockingNotificationMessage,
  setBudgetTimeHistory,
  previousItem,
  setPreviousItem,
  setShowProblemNotification,
  setShowTaskNotification,
}) {
  // (1) Wywoływane, kiedy użytkownik wybiera decyzję w zadaniu/problematyce
  const handleDecision = (decision) => {
    // Specjalny warunek: modyfikacja budżetu/time jednego z zadań
    if (decision.id === 'D-PZ2-3-2') {
      // Przykład: Modyfikacja taska "PZ3-5" w Implementacji
      setTasks((prevTasks) => {
        const updated = { ...prevTasks };
        updated.Implementacja = updated.Implementacja.map((task) => {
          if (task.id === 'PZ3-5') {
            return {
              ...task,
              decision2: {
                ...task.decision2,
                budgetCost: 18,
                timeCost: 9,
              },
            };
          }
          return task;
        });
        return updated;
      });
    }

    const budgetCost = calculateCost(decision.budgetCost);
    const timeCost   = calculateCost(decision.timeCost);

    // Obsługa ewentualnej dodatkowej puli budżetu (rzut kością)
    if (decision.extraBudget) {
      const { diceRoll, threshold, reward } = decision.extraBudget;
      let sides = 6;
      if (diceRoll === 'k12') sides = 12;
      const diceResult = rollDice(sides);
      if (diceResult >= threshold) {
        dispatch(setBudget(budget + reward));
      }
    }

    dispatch(applyDecision(decision));

    // Jeśli dotyczy to zadania
    if (selectedTask) {
      dispatch(addSolvedTask({
        taskId: selectedTask.id,
        decisionId: decision.id,
        decisionName: decision.name,
        actualBudgetCost: budgetCost,
        actualTimeCost: timeCost,
      }));
      dispatch(setSelectedTask(null));
    }
    // Jeśli dotyczy problemu
    else if (selectedProblem) {
      dispatch(addSolvedProblem({
        problemId: selectedProblem.id,
        decisionName: decision.name,
        actualBudgetCost: budgetCost,
        actualTimeCost: timeCost,
      }));
      dispatch(setSelectedProblem(null));
    }
  };

  // (2) Kiedy gracz wybiera problem z listy
  const handleSelectProblem = (problem) => {
    if (!problem) return;

    // Jeśli mamy powiadomienie blokujące, wyłącz je
    setShowBlockingNotification(false);
    setBlockingNotificationMessage('');

    // Jeśli mamy notyfikację o nowym problemie – wyłącz ją
    setShowProblemNotification(false);

    // Zapamiętanie poprzednio wybranego elementu
    if (selectedTask) {
      setPreviousItem({ type: 'task', item: selectedTask });
    } else if (selectedProblem) {
      setPreviousItem({ type: 'problem', item: selectedProblem });
    }

    dispatch(setSelectedProblem(problem));
    dispatch(setSelectedTask(null));
  };

  // (3) Zamykanie powiadomienia problemu
  const handleCloseProblemNotification = () => {
    setShowProblemNotification(false);
  };

  // (4) Zamykanie powiadomienia zadań
  const handleCloseTaskNotification = () => {
    setShowTaskNotification(false);
  };

  // (5) Restart gry
  const handleRestart = () => {
    dispatch(restartGame());
    setTasks({ ...initialTasks });
    setUnexpectedTasks([]);
    setProblemQueue([]);
    setStagesWithUnexpectedAdded([]);
    setStagesWithProblemsAdded([]);
    setShowBlockingNotification(false);
    setBlockingNotificationMessage('');
    setBudgetTimeHistory([
      {
        budget: 78,
        time: 52,
        expectedBudget: 78,
        expectedTime: 52,
      },
    ]);
  };

  return {
    handleDecision,
    handleSelectProblem,
    handleCloseProblemNotification,
    handleCloseTaskNotification,
    handleRestart,
  };
}

// Pomocnicza funkcja do rzutów kością
function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides + 1);
}
