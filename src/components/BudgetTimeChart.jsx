import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale, // Skala dla osi X
	LinearScale,  // Skala dla osi Y
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  // Rejestracja komponentów
  ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  );

  const options = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
	  x: {
		type: 'category', // Skala osi X
		title: {
		  display: true,
		  text: 'Tura',
		},
	  },
	  y: {
		type: 'linear', // Skala osi Y
		title: {
		  display: true,
		  text: 'Wartość',
		},
		beginAtZero: true,
	  },
	},
  };

const BudgetTimeChart = ({ history: budgetTimeHistory }) => {
	const data = {
	  labels: budgetTimeHistory.map((entry, index) => `Tura ${index + 1}`),
	  datasets: [
		{
		  label: 'Budżet',
		  data: budgetTimeHistory.map(entry => entry.budget),
		  borderColor: 'rgba(75, 192, 192, 1)',
		  backgroundColor: 'rgba(75, 192, 192, 0.2)',
		  fill: true,
		},
		{
		  label: 'Czas',
		  data: budgetTimeHistory.map(entry => entry.time),
		  borderColor: 'rgba(255, 99, 132, 1)',
		  backgroundColor: 'rgba(255, 99, 132, 0.2)',
		  fill: true,
		},
	  ],
	};
  
	return (
	  <div style={{ height: '300px' }}>
		<Line data={data} options={options} />
	  </div>
	);
  };

export default BudgetTimeChart;
  