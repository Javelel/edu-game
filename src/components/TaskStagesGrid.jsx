import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';

const TaskStagesGrid = ({
  columns,
  tasks,
  solvedTasks,
  selectedTask
}) => {
  return (
    <Box
      style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        {Object.entries(tasks).map(([categoryName, categoryTasks], colIndex) => (
          <Grid item xs={12 / columns.length} key={colIndex}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              style={{ fontWeight: 'bold', color: '#333' }}
            >
              {categoryName}
            </Typography>
            {categoryTasks.map((task) => {
				const solvedTask = solvedTasks.find((st) => st.taskId === task.id);
			return (
              <TaskCard
                key={task.id}
				task={{
					...task,
					actualBudgetCost: solvedTask?.actualBudgetCost,
					actualTimeCost: solvedTask?.actualTimeCost,
				  }}
                isSolved={solvedTasks.some(
                  (solvedTask) => solvedTask.taskId === task.id
                )}
				solvedDecision={solvedTask?.decisionName}
				isSelected={selectedTask?.id === task.id}
                isClickable={false}
                onClick={() => {}}
              />
            )})}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskStagesGrid;
