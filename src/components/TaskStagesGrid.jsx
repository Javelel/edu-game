import React from 'react';
import { Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';

const TaskStagesGrid = ({
  columns,
  tasks,
  solvedTasks,
}) => {
  return (
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
  );
};

export default TaskStagesGrid;
