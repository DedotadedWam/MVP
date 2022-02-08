import React, { useState } from "react";
import { LandingPage } from "./components/LandingPage";

export const App = () => {
  const [inGame, setInGame] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  return inGame ? null : (
    <LandingPage
      getUser={(d) => {
        setCurrentUser(d);
        setInGame(!inGame);
      }}
    />
  );
};
