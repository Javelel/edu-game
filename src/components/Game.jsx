import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';
import { tasks } from '../data/tasks';
import { problems } from '../data/problems';
import { unexpectedTasks as unexpectedTasksData } from '../data/unexpectedTasks';
import TaskCard from './TaskCard';
import ProblemCard from './ProblemCard';
import DecisionBox from './DecisionBox';
import GameDialog from './GameDialog';
import ProblemNotification from './ProblemNotification';
import { getNextUnsolvedTask, getNextUnsolvedTaskWithUnexpected } from '../utils/taskHelpers';
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

const columns = ["Analiza", "Design", "Implementacja", "Testy", "Wdrożenie"];

const Game = () => {
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

  useEffect(() => {
    if (!selectedTask && !showProblemNotification && !selectedProblem) {
      const nextTask = getNextUnsolvedTaskWithUnexpected(columns, tasks, solvedTasks, unexpectedTasks);
      if (nextTask) {
        dispatch(setSelectedTask(nextTask));
      }
    }
  }, [selectedTask, solvedTasks, showProblemNotification, selectedProblem, dispatch]);

  useEffect(() => {
    const allTasksSolvedForStage = (stage) =>
      tasks[stage]?.every(task =>
        solvedTasks.some(solvedTask => solvedTask.taskId === task.id)
      );
  
    // Dla każdego etapu z `columns` sprawdź, czy został ukończony
    columns.forEach((stage) => {
      // Jeśli etap nie występuje w tasks (np. 'Wdrożenie'), pomiń
      if (!tasks[stage]) return;
  
      if (allTasksSolvedForStage(stage)) {
        // Filtrujemy zadania z pliku `unexpectedTasksData` dla etapu
        const newTasks = unexpectedTasksData.filter(
          task => task.stage === stage
        );
  
        // Dodajemy je do stanu, jeśli jeszcze nie zostały dodane
        setUnexpectedTasks(prev => {
          // Dodamy tylko te zadania, których nie ma w prev
          const notAddedYet = newTasks.filter(nt => 
            !prev.some(p => p.id === nt.id)
          );
          return [...prev, ...notAddedYet];
        });
      }
    });
  }, [solvedTasks]);

  useEffect(() => {
	const allTasksSolved = Object.values(tasks)
	  .flat()
	  .every(task => solvedTasks.some(solvedTask => solvedTask.taskId === task.id));
  
	const allDynamicProblemsSolved = dynamicProblems.every(problem =>
	  solvedProblems.includes(problem.id)
	);
  
	if (allTasksSolved && allDynamicProblemsSolved) {
	  const message =
		customerDissatisfaction === 0
		  ? 'Brawo! Projekt się udał, a klient jest zadowolony.'
		  : `Projekt ukończony, ale klient jest niezadowolony: ${customerDissatisfaction} punktów.`;
	  dispatch(setDialog({ open: true, message }));
	}
  }, [solvedTasks, solvedProblems, dynamicProblems, customerDissatisfaction, dispatch]);
  

  const handleDecision = (decision) => {
    dispatch(applyDecision(decision));

	if (budget - decision.budgetCost < 0) {
		dispatch(setDialog({ open: true, message: 'Gra zakończona: wyczerpałeś budżet.' }));
		return; // Zakończ obsługę decyzji
	  }
	
	  if (time - decision.timeCost < 0) {
		dispatch(setDialog({ open: true, message: 'Gra zakończona: zabrakło czasu.' }));
		return; // Zakończ obsługę decyzji
	  }

    if (selectedTask) {
      dispatch(addSolvedTask({ taskId: selectedTask.id, decisionId: decision.id }));
      dispatch(setSelectedTask(null));
    } else if (selectedProblem) {
      dispatch(addSolvedProblem(selectedProblem.id));
      dispatch(setSelectedProblem(null));
    }

    if (unexpectedTasks.some(task => task.id === selectedTask?.id)) {
      // Usuwamy zadanie nieprzewidziane po rozwiązaniu
      setUnexpectedTasks(prev => prev.filter(task => task.id !== selectedTask.id));
    }

    maybeAddNewProblem();
  };
  const rollDice = (sides = 6) => Math.floor(Math.random() * sides + 1);

const maybeAddNewProblem = () => {
  problems.forEach(problem => {
    // Sprawdź, czy problem już został dodany
    if (addedProblems[problem.id]) return;

    const rollResult = rollDice(); // Rzut kostką dla tego problemu
    let problemAdded = false;

    // Sprawdź warunek wymaganej decyzji
    if (problem.condition.requiredDecisionId) {
		const requiredDecision = solvedTasks.some(
			task => task.decisionId === problem.condition.requiredDecisionId
		  );
      if (!requiredDecision) return; // Wymagana decyzja nie została podjęta
    }
    // Sprawdź warunki wystąpienia problemu
    if (problem.condition.alwaysOccurs) {
      // Problem zawsze występuje, jeśli spełnione są podstawowe wymagania
      problemAdded = true;
    } else if (problem.condition.if) {
      // Problem zależny od decyzji warunkowej
      const hasConditionMet = solvedTasks.some(task => task.decisionId === problem.condition.if);
      problemAdded = hasConditionMet
        ? rollResult >= problem.condition.baseChance // Warunek spełniony
        : rollResult >= (problem.condition.elseChance || problem.condition.baseChance); // Warunek niespełniony
    } else {
      // Domyślne sprawdzenie na podstawie rzutu kostką i baseChance
      problemAdded = rollResult >= problem.condition.baseChance;
    }

    // Dodaj problem, jeśli spełniono wszystkie wymagania
    if (problemAdded) {
      dispatch(addDynamicProblem({ ...problem, isNew: true }));
      setProblemNotificationMessage(`Pojawił się nowy problem: ${problem.name}`);
      setShowProblemNotification(true);
      dispatch(setSelectedTask(null));
      dispatch(setSelectedProblem(null));
    }
  });
};

  const handleSelectProblem = (problem) => {
	if (!problem) {
		console.log("LLL");
		return;}
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
  };

  return (
    <Box p={3}>
      <Box mb={2}>
        <Typography variant="h6">Statystyki</Typography>
        <Typography variant="body1">
          Budżet: {budget} | Czas: {time} | Niezadowolenie klienta: {customerDissatisfaction}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(tasks).map(([categoryName, categoryTasks], colIndex) => (
          <Grid item xs={12 / columns.length} key={colIndex}>
            <Typography variant="h6" align="center" gutterBottom>
              {categoryName}
            </Typography>
            {categoryTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isSolved={solvedTasks.some(solvedTask => solvedTask.taskId === task.id)}
                isClickable={false}
                onClick={() => {}}
              />
            ))}
          </Grid>
        ))}
      </Grid>

  <Grid container spacing={2}>
    {columns.map((stage, colIndex) => (
      <Grid item xs={12 / columns.length} key={colIndex}>
        {unexpectedTasks
          .filter(task => task.stage === stage)
          .map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isSolved={solvedTasks.some(solvedTask => solvedTask.taskId === task.id)}
              isClickable={false}
              onClick={() => dispatch(setSelectedTask(task))}
            />
          ))}
      </Grid>
    ))}
  </Grid>



      <Box mt={4}>
        <Typography variant="h6">Problemy</Typography>
        <Grid container spacing={2}>
          {dynamicProblems.map(problem => (
            <Grid item xs={12} md={6} lg={4} key={problem.id}>
              <ProblemCard
                problem={problem}
                isSolved={solvedProblems.includes(problem.id)}
                isClickable={!solvedProblems.includes(problem.id)}
                onClick={() => handleSelectProblem(problem)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        {showProblemNotification ? (
          <ProblemNotification
            message={problemNotificationMessage}
            onClose={handleCloseProblemNotification}
          />
        ) : (
          (selectedTask || selectedProblem) && (
            <DecisionBox
              selectedItem={selectedTask || selectedProblem}
              handleDecision={handleDecision}
            />
          )
        )}
      </Box>

      <GameDialog
        open={dialogOpen}
        message={dialogMessage}
        onRestart={handleRestart}
      />
    </Box>
  );
};

export default Game;
