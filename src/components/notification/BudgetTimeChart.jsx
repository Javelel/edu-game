import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

const budgetOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Taski',
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: 'Ilość pieniędzy',
      },
      beginAtZero: true,
    },
  },
};

const timeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Taski',
      },
    },
    y: {
      type: 'linear',
      title: {
        display: true,
        text: 'Pozostały czas',
      },
      beginAtZero: true,
    },
  },
};

// Wykres dla Budżetu
const BudgetChart = ({ history }) => {
  const data = {
    labels: history.map((entry, index) => `Task ${index + 1}`),
    datasets: [
      {
        label: 'Rzeczywisty budżet',
        data: history.map((entry) => entry.budget),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Przewidywany budżet',
        data: history.map((entry) => entry.expectedBudget),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ height: '250px', flex: 1, marginRight: '16px' }}>
      <Line data={data} options={budgetOptions} />
    </div>
  );
};

// Wykres dla Czasu
const TimeChart = ({ history }) => {
  const data = {
    labels: history.map((entry, index) => `Task ${index + 1}`),
    datasets: [
      {
        label: 'Rzeczywisty czas',
        data: history.map((entry) => entry.time),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Przewidywany czas',
        data: history.map((entry) => entry.expectedTime),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ height: '250px', flex: 1 }}>
      <Line data={data} options={timeOptions} />
    </div>
  );
};

// Eksport obu wykresów w jednym kontenerze
const BudgetTimeChart = ({ history }) => (
  <div
    style={{
      display: 'flex', // Ustawienie elementów w rzędzie
      justifyContent: 'space-between', // Rozdzielenie elementów równomiernie

    }}
  >
    <BudgetChart history={history} />
    <TimeChart history={history} />
  </div>
);

export default BudgetTimeChart;
