import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";

export const GuessBoard = ({ socket, user, room, answer, actor }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  const sendGuess = async (e) => {
    e.preventDefault();
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

  return !actor ? (
    <div className="guess-board">
      <div className="guess-header">Guess: </div>
      <div className="guess-body">
        {guessList.map((guessContent) => {
          return (
            <div className="guess">
              <div
                className={
                  guessContent.user === user ? "my-guess" : "opponents-guess"
                }
              >
                <div className="guess-content">{guessContent.guess}</div>
                <div className="guess-meta">{`${guessContent.user} ${guessContent.time}`}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="guess-footer">
        <form onSubmit={sendGuess}>
          <input
            type="text"
            className="field"
            onChange={(e) => setCurrentGuess(e.target.value)}
          />
          <input type="submit"></input>
        </form>
      </div>
    </div>
  ) : (
    <div className="guess-board">
      <h1 className="answer">
        Your word is: <br /> {answer}
      </h1>
    </div>
  );
};
