export const problems = [
	{
	  id: 'WZ3-14',
	  name: 'Słabo zdefiniowany zakres',
	  description: 'Podejrzewamy, że mamy w zakresie niepotrzebne rzeczy.',
	  category: 'Analiza',
	  condition: {
		baseChance: 3,
		modifiers: [
		  { source: 'D-PZ1-1-2', adjustment: 2 }, // +2 za "Zamodelowanie nowych procesów biznesowych"
		  { source: 'D-PZ1-2-2', adjustment: 1 }, // +1 za "Ściągniecie analityka systemowego"
		],
	  },
	  decision1: {
		id: 'RWZ3-14A',
		name: 'Wracamy do analizy i aktualizujemy zakres',
		budgetCost: 3,
		timeCost: 2,
		customerDissatisfaction: 1,
		description: 'Lepiej późno niż wcale, choć klient będzie niezadowolony.',
	  },
	  decision2: {
		id: 'RWZ3-14B',
		name: 'Implementujemy wszystko',
		budgetCost: 8,
		timeCost: 4,
		description: 'Płacą nam za kodzenie, a nie gadanie.',
	  },
	},
	{
	  id: 'WZ3-15',
	  name: 'Niedziałające elementy frameworku',
	  description: 'Framework może być niekompatybilny z systemem.',
	  category: 'Implementacja',
	  condition: {
		baseChance: 3,
		requiredDecisionId: 'D-PZ3-6-2',
	  },
	  decision1: {
		id: 'RWZ3-15A',
		name: 'Piszemy brakujące elementy samemu',
		budgetCost: 6,
		timeCost: 4,
	  },
	  decision2: {
		id: 'RWZ3-15B',
		name: 'Zostawiamy jak jest',
		budgetCost: 0,
		timeCost: 0,
		customerDissatisfaction: 2,
		description: 'Klient będzie bardzo niezadowolony.',
	  },
	},
	{
	  id: 'WZ4-16',
	  name: 'Niespodziewana liczba błędów',
	  description: 'Liczba błędów w systemie jest większa niż przewidywano.',
	  category: 'Testy',
	  condition: {
		baseChance: 6,
		modifiers: [
		  { source: 'Stażysta', adjustment: -1 },
		  { source: 'Niedoświadczeni pracownicy', adjustment: -2 },
		],
	  },
	  decision1: {
		id: 'RWZ4-16A',
		name: 'Poprawiamy wszystkie istotne błędy',
		budgetCost: 6,
		timeCost: 4,
		description: 'Trzeba zakasać rękawy.',
	  },
	  decision2: {
		id: 'RWZ4-16B',
		name: 'Poprawiamy tylko krytyczne błędy',
		budgetCost: 2,
		timeCost: 1,
		customerDissatisfaction: 1,
		description: 'Klient będzie niezadowolony.',
	  },
	},
	{
	  id: 'WZ4-17',
	  name: 'Nieintuicyjny interfejs',
	  description: 'Interfejs użytkownika jest trudny do zrozumienia.',
	  category: 'Testy',
	  condition: {
		if: 'D-PZ2-4-1',
		baseChance: 2,
		elseChance: 5,
	  },
	  decision1: {
		id: 'RWZ4-17A',
		name: 'Poprawiamy nieintuicyjne elementy',
		budgetCost: 3,
		timeCost: 4,
	  },
	  decision2: {
		id: 'RWZ4-17B',
		name: 'Zostawiamy jak jest',
		budgetCost: 0,
		timeCost: 0,
		customerDissatisfaction: 1,
		description: 'Klient będzie niezadowolony.',
	  },
	},
	{
	  id: 'WZ5-18',
	  name: 'Skokowe obciążenia systemu',
	  description: 'Zrobiliśmy sobie DDOS w trakcie zapisów.',
	  category: 'Wdrożenie',
	  condition: {
		requiredDecisionId: 'D-PZ3-5-1',
	  },
	  decision1: {
		id: 'RWZ5-18A',
		name: 'Zwiększamy zasoby serwerowe',
		budgetCost: 12,
		timeCost: 1,
	  },
	  decision2: {
		id: 'RWZ5-18B',
		name: 'Przebudowa aplikacji',
		budgetCost: 6,
		timeCost: 6,
	  },
	},
	{
	  id: 'WZ5-19',
	  name: 'Niespójności w listach studentów',
	  description: 'Dane studentów są niespójne w różnych częściach systemu.',
	  category: 'Wdrożenie',
	  condition: {
		requiredDecisionId: 'D-PZ4-7-1',
		baseChance: 0,
		elseChance: 6,
	  },
	  decision1: {
		id: 'RWZ5-19A',
		name: 'Poprawienie niespójności',
		budgetCost: 4,
		timeCost: 4,
		description: 'Jeśli istnieje problem musisz wybrać.',
	  },
	},
	{
	  id: 'WZ5-20',
	  name: 'Brak obsługi przypadków granicznych',
	  description: 'System nie obsługuje skrajnych scenariuszy.',
	  category: 'Wdrożenie',
	  condition: {
		requiredDecisionId: 'D-PZ4-8-1',
		alwaysOccurs: true,
	  },
	  decision1: {
		id: 'RWZ5-20A',
		name: 'Dodanie przypadków granicznych',
		budgetCost: '2+k6',
		timeCost: '2+k6',
		description:
		  'Jeśli istnieje problem musisz wybrać; jeśli wybrano "Implementujemy wszystko" w RWZ3-14 na 5+ nam się upiekło.',
	  },
	},
  ];
  