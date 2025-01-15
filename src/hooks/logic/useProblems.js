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
  useEffect(() => {

    setNewProblemJustAdded(false);

    let anyProblemAdded = false;

    columns.forEach((stage) => {
      if (!tasks[stage]) return;

      const allSolvedThisStage = allTasksSolvedForStage(stage, tasks, solvedTasks, unexpectedTasks);

      if (allSolvedThisStage && !stagesWithProblemsAdded.includes(stage)) {
        const newProblemsForStage = [];

        problems.forEach((problem) => {
          if (problem.category === stage) {
            if (shouldProblemAppear(problem, solvedTasks, addedProblems)) {
              dispatch(addDynamicProblem({ ...problem, isNew: true }));
              anyProblemAdded = true;
              newProblemsForStage.push(problem.name);

              dispatch(setSelectedTask(null));
              dispatch(setSelectedProblem(null));
            }
          }
        });

        if (newProblemsForStage.length > 0) {
          setProblemQueue((prevQueue) => [
            ...prevQueue,
            `Nowe problemy w etapie "${stage}": ${newProblemsForStage.join(', ')}`,
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

    const allDynamicProblemsSolved = dynamicProblems.every((p) =>
      solvedProblems.some((sp) => sp.problemId === p.id)
    );

    if (allMainTasksSolved && allDynamicProblemsSolved) {
      const message = {
        budget,
        time,
        customerDissatisfaction,
      };
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

function shouldProblemAppear(problem, solvedTasks, addedProblems) {
  if (addedProblems[problem.id]) return false;

  let chanceThreshold = problem.condition?.baseChance || 0;

  if (Array.isArray(problem.condition?.modifiers)) {
    problem.condition.modifiers.forEach((mod) => {
      const hasModifierDecision = solvedTasks.some((t) => t.decisionId === mod.source);
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
  const allBase = baseTasks.every((t) => solvedTasks.some((st) => st.taskId === t.id));

  const unexpectedInStage = unexpectedTasks.filter((ut) => ut.solveStage === stage);
  const allUnexpected = unexpectedInStage.every((ut) =>
    solvedTasks.some((st) => st.taskId === ut.id)
  );

  return allBase && allUnexpected;
}
