import React from 'react';
import { Grid } from '@mui/material';
import TaskCard from './TaskCard';

const UnexpectedTasksGrid = ({
  columns,
  unexpectedTasks,
  solvedTasks,
  onTaskSelect
}) => {
  return (
    <Grid container spacing={2}>
      {columns.map((stage, colIndex) => (
        <Grid item xs={12 / columns.length} key={stage}>
          {unexpectedTasks
            .filter(task => task.stage === stage)
            .map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isSolved={solvedTasks.some(solvedTask => solvedTask.taskId === task.id)}
                isClickable={true}
                onClick={() => onTaskSelect(task)}
              />
            ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default UnexpectedTasksGrid;
