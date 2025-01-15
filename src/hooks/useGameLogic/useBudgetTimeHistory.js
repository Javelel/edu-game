import { useEffect } from 'react';

/**
 * Aktualizuje historię budżetu i czasu za każdym razem,
 * gdy zmienia się budżet / czas (lub oczekiwany budżet / czas).
 */
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
