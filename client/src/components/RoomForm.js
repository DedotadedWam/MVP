import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const RoomForm = ({ role, resetRole, getUser }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (d) => {
    const user = { ...d, role };
    axios
      .post(`/${role}Game`, user)
      .then((response) => console.log(response.status))
      .catch((err) => console.log(err));
    getUser(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <br />
          <input
            name="username"
            type="text"
            {...register("username", { required: true })}
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
          Room Password:
          <br />
          <input
            name="password"
            type="password"
            {...register("password", { required: true })}
          ></input>
        </label>
        <br />
        <br />
        <button type="submit" value="Submit">
          Let's Play!
        </button>
      </form>
    </div>
  );
};
