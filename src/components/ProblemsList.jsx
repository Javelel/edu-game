import React from "react";
import { Box, Typography } from "@mui/material";
import ProblemCard from "./ProblemCard";

const ProblemsList = ({ dynamicProblems, solvedProblems, onSelectProblem, selectedProblem }) => {
  return (
    <Box
      style={{
        backgroundColor: "#f7f9fc",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		maxWidth: "400px",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", color: "#333" }}
      >
        Problemy
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{ gap: "10px" }}
      >
        {dynamicProblems.map((problem) => {
			const solvedProblem = solvedProblems.find(
				(sp) => sp.problemId === problem.id
			  );
		return (
          <ProblemCard
            key={problem.id}
            problem={{
                ...problem,
                actualBudgetCost: solvedProblem?.actualBudgetCost,
                actualTimeCost: solvedProblem?.actualTimeCost,
              }}
            isSolved={!!solvedProblems.find((sp) => sp.problemId === problem.id)}
			solvedDecision={solvedProblem?.decisionName}
            isClickable={!solvedProblems.find((sp) => sp.problemId === problem.id)}
            isSelected={selectedProblem?.id === problem.id}
            onClick={() => onSelectProblem(problem)}
          />
        )})}
      </Box>
    </Box>
  );
};

export default ProblemsList;
