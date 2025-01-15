import { useEffect } from 'react';

export default function useBudgetTimeHistory({
  budget,
  time,
  expectedBudget,
  expectedTime,
  setBudgetTimeHistory,
}) {
  useEffect(() => {
    setBudgetTimeHistory((prevHistory) => [
      ...prevHistory,
      { budget, time, expectedBudget, expectedTime },
    ]);
  }, [budget, time, expectedBudget, expectedTime, setBudgetTimeHistory]);
}
