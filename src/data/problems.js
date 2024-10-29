export const problems = {
	Analiza: [
		{
			id: 1,
			name: 'Niedoprecyzowane wymagania',
			description: 'Wymagania klienta są niepełne lub zbyt ogólne, co utrudnia stworzenie spójnej wizji produktu.',
			decision1: { name: 'Przeprowadzić dodatkowe spotkania z klientem, aby doprecyzować oczekiwania', budgetCost: 1, timeCost: 2 },
			decision2: { name: 'Przeprowadzić warsztaty analityczne z zespołem, aby dopracować wymagania na podstawie posiadanych informacji', budgetCost: 2, timeCost: 1, ai: 1 }
		},
		{
			id: 2,
			name: 'Zmieniające się wymagania',
			description: 'W trakcie analizy klient zmienia oczekiwania, co powoduje konieczność dostosowywania planu.',
			decision1: { name: 'Wprowadzić rygorystyczne zasady zarządzania zmianami w projekcie', budgetCost: 3, timeCost: 1, customerSatisfaction: 1 },
			decision2: { name: 'Zgodzić się na zmiany, lecz zaplanować iteracyjne dostarczanie, aby umożliwić elastyczność', budgetCost: 1, timeCost: 3 }
		},
	],
	Design: [
		{
			id: 3,
			name: 'Niejasna architektura systemu',
			description: 'Zbyt ogólny plan architektury, który może spowodować problemy podczas implementacji.',
			decision1: { name: 'Przeprowadzić sesje planowania architektonicznego z ekspertami', budgetCost: 1, timeCost: 2 },
			decision2: { name: 'Podzielić projekt na mniejsze moduły i opracować architekturę dla każdego z nich', budgetCost: 2, timeCost: 1 }
		},
		{
			id: 4,
			name: 'Brak zgodności z wymaganiami technologicznymi',
			description: 'Technologie wybrane na początku projektu nie spełniają wszystkich wymagań funkcjonalnych.',
			decision1: { name: 'Przeanalizować dostępne alternatywy i wybrać inną technologię', budgetCost: 3, timeCost: 1 },
			decision2: { name: 'Dostosować wymagania do wybranej technologii', budgetCost: 1, timeCost: 3 }
		},
	],
	Implementacja: [
		{
			id: 5,
			name: 'Błędy w kodzie',
			description: 'Występowanie licznych błędów, które spowalniają rozwój i generują potrzebę ciągłego debugowania.',
			decision1: { name: 'Zainwestować w narzędzia do automatycznego testowania kodu', budgetCost: 1, timeCost: 2 },
			decision2: { 
				name: 'Przeprowadzić regularne przeglądy kodu przez zespół',
				budgetCost: 2,
				timeCost: 1,
				chanceAdjustment: [{ problemId: 11, change: 0.5 }]
			}
		},
		{
			id: 6,
			name: 'Problemy z integracją modułów',
			description: 'Niezgodności między modułami powodujące trudności w łączeniu ich w całość.',
			decision1: { name: 'Przeprowadzać częstsze, mniejsze integracje', budgetCost: 3, timeCost: 1 },
			decision2: { name: 'Wyznaczyć dedykowaną osobę odpowiedzialną za zarządzanie integracją', budgetCost: 1, timeCost: 3 }
		},
	],
	Testy: [
		{
			id: 7,
			name: 'Zbyt mała liczba przypadków testowych',
			description: 'Testy nie obejmują wszystkich scenariuszy, co może powodować pominięcie krytycznych błędów.',
			decision1: { name: 'Zlecić zespołowi testowemu stworzenie bardziej kompleksowego zestawu testów', budgetCost: 1, timeCost: 2 },
			decision2: { name: 'Skoncentrować się na testach najważniejszych funkcji i kluczowych scenariuszy', budgetCost: 2, timeCost: 1 }
		},
		{
			id: 8,
			name: 'Niska wydajność testowanego systemu',
			description: 'System działa zbyt wolno lub niestabilnie podczas testów wydajnościowych.',
			decision1: { name: 'Optymalizować kod i usunąć zbędne operacje', budgetCost: 3, timeCost: 1 },
			decision2: { name: 'Skalować infrastrukturę testową dla lepszej wydajności', budgetCost: 1, timeCost: 3 }
		},
	],
	Wdrożenie: [
		{
			id: 9,
			name: 'Problemy z migracją danych',
			description: 'Problemy podczas przenoszenia danych ze starego systemu do nowego, co powoduje błędy w działaniu.',
			decision1: { name: 'Opracować dokładny plan migracji z testami kontrolnymi', budgetCost: 1, timeCost: 2 },
			decision2: { name: 'Przeprowadzić migrację etapami, aby minimalizować ryzyko błędów', budgetCost: 2, timeCost: 1 }
		},
		{
			id: 10,
			name: 'Niezgodność z infrastrukturą produkcyjną',
			description: 'Nowe oprogramowanie nie działa poprawnie na produkcyjnych serwerach.',
			decision1: { name: 'Przeprowadzić testy wdrożeniowe na serwerach produkcyjnych przed pełnym uruchomieniem', budgetCost: 3, timeCost: 1 },
			decision2: { name: 'Skonsultować się z administratorem systemu, aby dostosować infrastrukturę', budgetCost: 1, timeCost: 3 }
		},
	]

};