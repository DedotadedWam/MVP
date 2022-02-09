import React, { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { GameRoom } from "./components/GameRoom";

export const App = () => {
  const [inGame, setInGame] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  return inGame ? (
    <GameRoom
      user={{ username: currentUser.username, role: currentUser.role }}
      room={currentUser.room}
    />
  ) : (
    <LandingPage
      getUser={(d) => {
        setCurrentUser(d);
        setInGame(!inGame);
      }}
    />
  );
};
