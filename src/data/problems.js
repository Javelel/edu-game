export const problems = [
	{
	  id: 'WZ3-14',
	  name: 'Słabo zdefiniowany zakres',
	  description: 'Podejrzewamy, że mamy w zakresie niepotrzebne rzeczy.',
	  descriptionLong: 'Zakres projektu zawiera elementy, które mogą okazać się zbędne, co prowadzi do strat czasu i budżetu. Nieprawidłowy zakres wpłynie na wszystkie etapy projektu, a późniejsze naprawy będą jeszcze droższe. Musisz zareagować, aby uniknąć chaosu i niezadowolenia klienta.',
    category: 'Implementacja',
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
		description: 'Wróć do analizy, aktualizując zakres projektu. Chociaż klient może być niezadowolony, zabezpieczasz przyszłość projektu.',
    },
	  decision2: {
		id: 'RWZ3-14B',
		name: 'Implementujemy wszystko',
		budgetCost: 8,
		timeCost: 4,
		description: 'Kontynuuj realizację całego obecnego zakresu, ryzykując nadmierne koszty.',
    },
	},
	{
	  id: 'WZ3-15',
	  name: 'Niedziałające elementy frameworku',
	  description: 'Framework może być niekompatybilny z systemem.',
	  descriptionLong: 'Wybrany framework nie działa zgodnie z oczekiwaniami, co powoduje problemy z funkcjonalnością systemu. Decyzja, jak to naprawić, wpłynie na stabilność i użyteczność aplikacji.',
    category: 'Implementacja',
	  condition: {
		baseChance: 7,
		modifiers: [
			{ source: 'D-PZ3-6-2', adjustment: -4 },
		],
	  },
	  decision1: {
		id: 'RWZ3-15A',
		name: 'Piszemy brakujące elementy samemu',
		budgetCost: 6,
		timeCost: 4,
		description: 'Napisz brakujące elementy samodzielnie. To kosztowne i czasochłonne, ale zapewni pełną funkcjonalność systemu.',
    },
	  decision2: {
		id: 'RWZ3-15B',
		name: 'Zostawiamy jak jest',
		budgetCost: 0,
		timeCost: 0,
		customerDissatisfaction: 2,
		description: 'Pozostaw problem nierozwiązany, narażając się na duże niezadowolenie klienta i ograniczenia w działaniu systemu.',
    },
	},
	{
	  id: 'WZ4-16',
	  name: 'Niespodziewana liczba błędów',
	  description: 'Liczba błędów w systemie jest większa niż przewidywano.',
	  descriptionLong: 'Błędy w systemie są liczniejsze, niż zakładano, co wpływa na jego stabilność i jakość. Musisz zareagować bo w przeciwnym razie ryzykujesz utratę zaufania klienta i użytkowników końcowych. Każda decyzja ma swoje konsekwencje dla harmonogramu i budżetu.',
    category: 'Testy',
	  condition: {
		baseChance: 6,
		modifiers: [
		  { source: 'D-PZ2-3-1', adjustment: -1 },
		  { source: 'RNZ1-11A', adjustment: -2 },
		],
	  },
	  decision1: {
		id: 'RWZ4-16A',
		name: 'Poprawiamy wszystkie istotne błędy',
		budgetCost: 6,
		timeCost: 4,
		description: 'Popraw wszystkie błędy, poświęcając czas i budżet, ale zapewniając najwyższą jakość systemu.',
    },
	  decision2: {
		id: 'RWZ4-16B',
		name: 'Poprawiamy tylko krytyczne błędy',
		budgetCost: 2,
		timeCost: 1,
		customerDissatisfaction: 1,
		description: 'Popraw jedynie krytyczne błędy, oszczędzając czas i zasoby, ale ryzykując niezadowolenie klienta.',
    },
	},
	{
	  id: 'WZ4-17',
	  name: 'Nieintuicyjny interfejs',
	  description: 'Interfejs użytkownika jest trudny do zrozumienia.',
	  descriptionLong: 'Interfejs użytkownika jest trudny w obsłudze, co wpływa na doświadczenie użytkowników. Jeśli nie zostanie poprawiony, może obniżyć skuteczność i akceptację systemu. Użytkownicy oczekują prostoty i wygody, a twój wybór zadecyduje, jak system zostanie odebrany.',
    category: 'Testy',
	  condition: {
		baseChance: 5,
		modifiers: [
			{ source: 'D-PZ2-4-1', adjustment: -3 },
		],
	  },
	  decision1: {
		id: 'RWZ4-17A',
		name: 'Poprawiamy nieintuicyjne elementy',
		budgetCost: 3,
		timeCost: 4,
		description: 'Popraw nieintuicyjne elementy interfejsu, zwiększając satysfakcję użytkowników, ale poświęcając dodatkowe zasoby.',
    },
	  decision2: {
		id: 'RWZ4-17B',
		name: 'Zostawiamy jak jest',
		budgetCost: 0,
		timeCost: 0,
		customerDissatisfaction: 1,
		description: 'Pozostaw interfejs w obecnym stanie, narażając się na krytykę i niezadowolenie klienta i użytkowników.',
    },
	},
	{
	  id: 'WZ5-18',
	  name: 'Skokowe obciążenia systemu',
	  description: 'Zrobiliśmy sobie DDOS w trakcie zapisów.',
	  descriptionLong: 'Nagłe skoki obciążenia ujawniają problemy z wydajnością systemu. Jeśli nie zareagujesz, system może stać się niewydolny w kluczowych momentach, takich jak zapisy. Twoja decyzja wpłynie na stabilność i dostępność systemu.',
    category: 'Wdrożenie',
	  condition: {
		baseChance: 7,
		modifiers: [
			{ source: 'D-PZ3-5-1', adjustment: -7 },
		],
	  },
	  decision1: {
		id: 'RWZ5-18A',
		name: 'Zwiększamy zasoby serwerowe',
		budgetCost: 12,
		timeCost: 1,
		description: 'Zwiększ zasoby serwerowe, aby szybko rozwiązać problem, kosztem wysokich kosztów operacyjnych.',
    },
	  decision2: {
		id: 'RWZ5-18B',
		name: 'Przebudowa aplikacji',
		budgetCost: 6,
		timeCost: 6,
		description: 'Przebuduj aplikację, aby lepiej radziła sobie z obciążeniem. Rozwiązanie czasochłonne, ale tańsze.',
    },
	},
	{
	  id: 'WZ5-19',
	  name: 'Niespójności w listach studentów',
	  description: 'Dane studentów są niespójne w różnych częściach systemu.',
	  descriptionLong: 'Dane studentów są niespójne w różnych częściach systemu, co podważa zaufanie użytkowników do systemu. Ignorowanie tego problemu nie wchodzi w grę - brak spójności może prowadzić do poważnych błędów operacyjnych.',
    category: 'Wdrożenie',
	  condition: {
		baseChance: 6,
		modifiers: [
			{ source: 'D-PZ4-7-1', adjustment: -4 },
		],
	  },
	  decision1: {
		id: 'RWZ5-19A',
		name: 'Poprawienie niespójności',
		budgetCost: 4,
		timeCost: 4,
		description: 'Popraw wszystkie niespójności, poświęcając czas na zapewnienie integralności danych.',
    },
	},
	{
	  id: 'WZ5-20',
	  name: 'Brak obsługi przypadków granicznych',
	  description: 'System nie obsługuje skrajnych scenariuszy.',
	  descriptionLong: 'System nie obsługuje skrajnych scenariuszy, co może prowadzić do awarii w nietypowych sytuacjach. Musisz to naprawić, w przeciwnym wypadku wpłynie to negatywnie na funkcjonalność systemu i zaufanie użytkowników.',
    category: 'Wdrożenie',
	  condition: {
		baseChance: 7,
		modifiers: [
			{ source: 'D-PZ4-8-1', adjustment: -7 },
		],
	  },
	  decision1: {
		id: 'RWZ5-20A',
		name: 'Dodanie przypadków granicznych',
		budgetCost: '2+k6',
		timeCost: '2+k6',
		description: 'Dodaj obsługę przypadków granicznych, inwestując zasoby w zwiększenie niezawodności systemu.',
    },
	},
  ];
  