import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';

const UnexpectedTasksGrid = ({
  columns,
  unexpectedTasks,
  solvedTasks,
  selectedTask
}) => {
  return (
    <Box
      style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '-10px', // Połączenie wizualne z TaskStagesGrid
      }}
    >
      <Grid container spacing={2}>
        {columns.map((stage, colIndex) => (
          <Grid item xs={12 / columns.length} key={stage}>
            {unexpectedTasks
              .filter((task) => task.solveStage === stage)
              .map((task) => {
				const solvedTask = solvedTasks.find(
					(solvedTask) => solvedTask.taskId === task.id
				  );
				return (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSolved={solvedTasks.some(
                    (solvedTask) => solvedTask.taskId === task.id
                  )}
				  solvedDecision={solvedTask?.decisionName}
				  isSelected={selectedTask?.id === task.id}
                  isClickable={false}
                />
              )})}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UnexpectedTasksGrid;
