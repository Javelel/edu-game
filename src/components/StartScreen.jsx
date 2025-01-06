import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

const StartScreen = ({ onStart }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Witaj w Grze!
      </Typography>

      {/* Sekcja: Opis gry */}
      <Box style={{ maxWidth: "800px", marginBottom: "20px" }}>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Opis gry
        </Typography>
        <Typography
          variant="body1"
          style={{
            lineHeight: "1.8",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Twoim zadaniem jest zaprojektowanie i zrealizowanie systemu informatycznego
          dla dziekanatu Politechniki Warszawskiej. Projekt został podzielony na pięć
          etapów, a każdy etap składa się z zadań. Zaplanowałeś koszty i czas
          potrzebny na realizację poszczególnych zadań, jednak to jedynie założenia. <br /><br />
          Twoim celem jest ukończenie wszystkich zadań w ramach ustalonego budżetu i harmonogramu.
          W trakcie realizacji projektu pojawią się nieprzewidziane zadania, a wyniku podjętych decyzji mogą wystąpić problemy,
          wymagające rozwiązania. Każda decyzja wpłynie na przebieg projektu:
          koszty, czas realizacji oraz satysfakcję klienta.
        </Typography>
      </Box>

      <Divider style={{ width: "80%", margin: "20px 0", backgroundColor: "#fff" }} />

      {/* Sekcja: Instrukcja */}
      <Box style={{ maxWidth: "800px", marginBottom: "30px" }}>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Instrukcja
        </Typography>
        <Typography
          variant="body1"
          style={{
            lineHeight: "1.8",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Zadania realizujesz poprzez kliknięcie w odpowiednią decyzję w prawym dolnym
          rogu ekranu. Problemy pojawiają się po prawej stronie ekranu. Aby je rozwiązać,
          kliknij na problem, a następnie wybierz decyzję. <br />
          Wykresy można zwijać, aby uzyskać lepszy widok na inne elementy interfejsu. <br />
		  Aby wyświetlić ten ekran ponownie, odśwież stronę.
        </Typography>
      </Box>

      <Button
        variant="contained"
        style={{
          backgroundColor: "#ff9800",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px 20px",
          fontSize: "18px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onClick={onStart} // Wywołanie funkcji przekazanej w props
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default StartScreen;
