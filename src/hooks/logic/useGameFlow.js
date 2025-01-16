import { useEffect } from "react";
import {
  addDynamicProblem,
  setSelectedTask,
  setSelectedProblem,
  setDialog
} from "../../redux/reducers/gameReducer";

export default function useGameFlow({
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
  selectedProblem,
  setShowResolveProblemsNotification,
  showResolveProblemsNotification,
}) {
  useEffect(() => {
    setNewProblemJustAdded(false);

    let anyProblemAdded = false;

    columns.forEach((stage) => {
      if (!tasks[stage]) return;

      const allSolvedThisStage = allTasksSolvedForStage(
        stage,
        tasks,
        solvedTasks,
        unexpectedTasks
      );

      if (allSolvedThisStage && !stagesWithProblemsAdded.includes(stage)) {
        const newProblemsForStage = [];

        problems.forEach((problem) => {
          if (problem.category === stage) {
            if (shouldProblemAppear(problem, solvedTasks, addedProblems)) {
              dispatch(addDynamicProblem({ ...problem, isNew: true }));
              anyProblemAdded = true;
              newProblemsForStage.push(problem.name);

              // Czyścimy selekcje
              dispatch(setSelectedTask(null));
              dispatch(setSelectedProblem(null));
            }
          }
        });

        if (newProblemsForStage.length > 0) {
          setProblemQueue((prevQueue) => [
            ...prevQueue,
            `Nowe problemy w etapie "${stage}": ${newProblemsForStage.join(", ")}`
          ]);
        }

        setStagesWithProblemsAdded((prev) => [...prev, stage]);
      }
    });

    if (anyProblemAdded) {
      setNewProblemJustAdded(true);
      return;
    }

    const allMainTasksSolved = Object.values(tasks)
      .flat()
      .every((task) => solvedTasks.some((st) => st.taskId === task.id));

    const allUnexpectedTasksSolved = unexpectedTasks.every((ut) =>
      solvedTasks.some((st) => st.taskId === ut.id)
    );
    const allTasksReallySolved = allMainTasksSolved && allUnexpectedTasksSolved;

    // Czy jest jakiś problem, który NIE jest jeszcze rozwiązany?
    const anyProblemUnsolved = dynamicProblems.some(
      (p) => !solvedProblems.some((sp) => sp.problemId === p.id)
    );

    // Jeśli wszystkie zadania są gotowe, ale mamy problemy 
    // i żaden nie jest obecnie "selectedProblem", 
    // to wyświetlamy powiadomienie "Masz problemy do rozwiązania"
    if (allTasksReallySolved && anyProblemUnsolved && !selectedProblem) {
      setShowResolveProblemsNotification(true);
    } else {
      // Schowaj powiadomienie
      if (showResolveProblemsNotification) {
        setShowResolveProblemsNotification(false);
      }
    }

    // Jeśli wszystko jest zrobione (zadania i problemy), kończymy grę
    if (allTasksReallySolved && !anyProblemUnsolved) {
      const message = {
        budget,
        time,
        customerDissatisfaction
      };
      dispatch(setDialog({ open: true, message }));
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
    selectedProblem,
    setShowResolveProblemsNotification,
    showResolveProblemsNotification
  ]);
}

function shouldProblemAppear(problem, solvedTasks, addedProblems) {
  if (addedProblems[problem.id]) return false;

  let chanceThreshold = problem.condition?.baseChance || 0;

  if (Array.isArray(problem.condition?.modifiers)) {
    problem.condition.modifiers.forEach((mod) => {
      const hasModifierDecision = solvedTasks.some(
        (t) => t.decisionId === mod.source
      );
      if (hasModifierDecision) {
        chanceThreshold += mod.adjustment;
      }
    });
  }

  const dice = rollDice(6);
  return dice >= chanceThreshold;
}

function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides + 1);
}

function allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks) {
  const baseTasks = tasks[stage] || [];
  const allBase = baseTasks.every((t) =>
    solvedTasks.some((st) => st.taskId === t.id)
  );

  const unexpectedInStage = unexpectedTasks.filter(
    (ut) => ut.solveStage === stage
  );
  const allUnexpected = unexpectedInStage.every((ut) =>
    solvedTasks.some((st) => st.taskId === ut.id)
  );

  return allBase && allUnexpected;
}
