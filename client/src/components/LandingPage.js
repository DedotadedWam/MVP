import React, { useState } from "react";
import { RoomForm } from "./RoomForm";

export const LandingPage = ({ getUser }) => {
  const [role, setRole] = useState(null);

  return role ? (
    <>
      <RoomForm
        getUser={getUser}
        resetRole={setRole}
        role={role === "HOST" ? "host" : "join"}
      />
      <button onClick={() => setRole(null)}>X</button>
    </>
  ) : (
    <>
      <button onClick={() => setRole("HOST")}>Host Game</button>
      <br />
      <button onClick={() => setRole("JOIN")}>Join Game</button>
    </>
  );
};
