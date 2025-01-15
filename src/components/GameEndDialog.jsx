import React from "react";
import GameDialog from "./GameDialog";

const GameEndDialog = ({ open, message, close, budgetTimeHistory }) => {
  return (
    <GameDialog
      open={open}
      message={message}
      close={close}
      budgetTimeHistory={budgetTimeHistory}
    />
  );
};

export default GameEndDialog;
