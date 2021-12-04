import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";

export const GuessBoard = ({ socket, user, room, answer }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  const sendGuess = async () => {
    if (currentGuess !== "") {
      let d = new Date(Date.now());
      d = d.getHours() + ":" + d.getMinutes();
      const guessData = {
        room,
        user,
        guess: currentGuess,
        time: d,
      };

      if (currentGuess.toLowerCase() === answer.toLowerCase()) {
        window.alert("CORRECT!");
        //TODO: Add correct guess functionality for scoring the game
      }
      await socket.emit("sendGuess", guessData);
      setGuessList((list) => [...list, guessData]);
    }
  };

  useEffect(() => {
    socket.on("receiveGuess", (guessData) => {
      setGuessList((list) => [...list, guessData]);
    });
  }, [socket]);

  return (
    <div className="guess-board">
      <div className="guess-header">Chat: </div>
      <div className="guess-body">
        {guessList.map((guessContent) => {
          return (
            <div className="guess">
              <div>
                <div className="guess-content">{guessContent.guess}</div>
                <div className="guess-meta">{guessContent.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="guess-footer">
        <input type="text" onChange={(e) => setCurrentGuess(e.target.value)} />
        <button onClick={sendGuess}>Submit Guess</button>
      </div>
    </div>
  );
};
