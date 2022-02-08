import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export const Login = ({ setUser, setRoom, setActor }) => {
  const { register, handleSubmit } = useForm();
  const [login, setLogin] = useState(false);

  const onSubmit = (d) => {
    axios
      .post("/login", d)
      .then(() => {
        setLogin(true);
        setUser(d.user);
        setRoom(d.room);
        setActor(JSON.parse(d.actor));
      })
      .catch((err) => console.error(err));
  };

  if (login) {
    return <div />;
  }
  return (
    <div style={{ backgroundColor: "rgba(0,0,0, 0.85)" }} className="modal-bg">
      <div className="modal-shroud">
        <div className="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Username:
              <br />
              <input
                name="user"
                type="text"
                {...register("user", { required: true })}
              ></input>
            </label>
            <br />
            <br />
            <label>
              Room:
              <br />
              <input
                name="room"
                type="text"
                {...register("room", { required: true })}
              ></input>
            </label>
            <br />
            <br />
            <label>
              Actor:
              <br />
              <input
                name="actor"
                type="text"
                {...register("actor", { required: true })}
              ></input>
            </label>
            <br />
            <br />
            <button type="submit" value="Submit">
              Let's Play!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// {...register('test', { required: true })}
