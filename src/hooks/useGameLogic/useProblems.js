import { useEffect } from 'react';
import { addDynamicProblem, setSelectedTask, setSelectedProblem } from '../../redux/reducers/gameReducer';

export default function useProblems({
  columns,
  tasks,
  solvedTasks,
  solvedProblems,
  dynamicProblems,
  problems,
  addedProblems,
  dispatch,
  setNewProblemJustAdded,
  stagesWithProblemsAdded,
  setStagesWithProblemsAdded,
  setProblemQueue,
  newProblemJustAdded,
  unexpectedTasks,
  customerDissatisfaction,
  budget,
  time,
  setDialog,
}) {
  // (A) Główna obsługa pojawiania się problemów
  useEffect(() => {
    // Reset stanu "dopiero co dodano problem"
    setNewProblemJustAdded(false);

    let anyProblemAdded = false;

    columns.forEach((stage) => {
      if (!tasks[stage]) return;

      // Czy w tym etapie ukończono wszystkie zadania (bazowe + nieprzewidziane)?
      const allSolvedThisStage = allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks);

      // Jeśli tak, a jeszcze nie dodaliśmy problemów dla tego etapu...
      if (allSolvedThisStage && !stagesWithProblemsAdded.includes(stage)) {
        const newProblemsForStage = [];

        // Sprawdzamy wszystkie możliwe problemy i decydujemy, czy dodać
        problems.forEach((problem) => {
          if (problem.category === stage) {
            if (shouldProblemAppear(problem, solvedTasks, addedProblems)) {
              // Dodajemy problem do store (Redux)
              dispatch(addDynamicProblem({ ...problem, isNew: true }));
              anyProblemAdded = true;
              newProblemsForStage.push(problem.name);

              // Zerujemy aktualnie wybrane zadanie/problem w UI
              dispatch(setSelectedTask(null));
              dispatch(setSelectedProblem(null));
            }
          }
        });

        // Jeśli pojawiły się jakiekolwiek nowe problemy...
        if (newProblemsForStage.length > 0) {
          setProblemQueue((prevQueue) => [
            ...prevQueue,
            `Nowe problemy w etapie "${stage}": ${newProblemsForStage.join(', ')}`,
          ]);
        }

        // Zaznaczamy, że problemy dla tego etapu zostały dodane
        setStagesWithProblemsAdded((prev) => [...prev, stage]);
      }
    });

    if (anyProblemAdded) {
      setNewProblemJustAdded(true);
      return; // Przerywamy – kolejny render, kolejny useEffect
    }

    // (B) Sprawdź, czy gra się kończy (gdy nie dodano żadnego nowego problemu)
    const allMainTasksSolved = Object.values(tasks)
      .flat()
      .every((task) => solvedTasks.some((st) => st.taskId === task.id));

    const allDynamicProblemsSolved = dynamicProblems.every((p) =>
      solvedProblems.some((sp) => sp.problemId === p.id)
    );

    if (allMainTasksSolved && allDynamicProblemsSolved) {
      const message = {
        budget,
        time,
        customerDissatisfaction,
      };
      // Wyświetlamy okno dialogowe
      setDialog({ open: true, message });
    }
  }, [
    columns,
    tasks,
    solvedTasks,
    solvedProblems,
    dynamicProblems,
    problems,
    addedProblems,
    dispatch,
    setNewProblemJustAdded,
    stagesWithProblemsAdded,
    setStagesWithProblemsAdded,
    setProblemQueue,
    newProblemJustAdded,
    unexpectedTasks,
    customerDissatisfaction,
    budget,
    time,
    setDialog,
  ]);
}

// Pomocnicza funkcja – czy problem się pojawia?
function shouldProblemAppear(problem, solvedTasks, addedProblems) {
  // 1. Jeśli problem został już kiedyś dodany, pomijamy
  if (addedProblems[problem.id]) return false;

  // 2. Base chance
  let chanceThreshold = problem.condition?.baseChance || 0;

  // 3. Modyfikatory
  if (Array.isArray(problem.condition?.modifiers)) {
    problem.condition.modifiers.forEach((mod) => {
      const hasModifierDecision = solvedTasks.some((t) => t.decisionId === mod.source);
      if (hasModifierDecision) {
        chanceThreshold += mod.adjustment;
      }
    });
  }

  // 4. Rzut kostką (k6)
  const dice = rollDice(6);

  // 5. Jeżeli wynik >= chanceThreshold => problem się pojawia
  return dice >= chanceThreshold;
}

// Rzut kostką k6 (domyślnie)
function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides + 1);
}

// Czy w etapie "stage" wszystkie zadania (bazowe + nieprzewidziane) są rozwiązane?
function allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks) {
  const baseTasks = tasks[stage] || [];
  const allBase = baseTasks.every((t) => solvedTasks.some((st) => st.taskId === t.id));

  const unexpectedInStage = unexpectedTasks.filter((ut) => ut.solveStage === stage);
  const allUnexpected = unexpectedInStage.every((ut) =>
    solvedTasks.some((st) => st.taskId === ut.id)
  );

  return allBase && allUnexpected;
}
