export const potentialProblems = [
	{
	  id: 11,
	  name: 'Przeciążony zespół',
	  description: 'Zespół ma zbyt dużo obowiązków, co prowadzi do zmniejszonej efektywności.',
	  category: 'Implementacja',
	  baseChance: 0, // Początkowa szansa na pojawienie się problemu
	  isAdded: false, // Flaga, aby upewnić się, że problem pojawia się tylko raz
	  decision1: { name: 'Zatrudnić dodatkowy personel', budgetCost: 3, timeCost: 2 },
	  decision2: { name: 'Zredukować zakres zadań', budgetCost: 1, timeCost: 1 }
	},
  ];