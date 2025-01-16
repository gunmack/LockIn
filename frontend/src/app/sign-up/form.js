import React, { useState } from "react";
import Link from "next/link";
import addUser from "@/app/sign-up/addUser";

export default function Form({ email }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value, confirmPassword);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    validatePassword(password, event.target.value);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setValidPassword(true);
      setError("");
    } else {
      setValidPassword(false);
      setError("Passwords do not match");
    }
  };

  const confirmUser = async () => {
    try {
      setUserAdded(true);
      await addUser(email, username, password);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!userAdded) {
    return (
      <form className="flex flex-col items-center justify-center gap-8 w-2/3">
        <input
          className="p-2 w-full rounded-lg text-black"
          type="text"
          id="email"
          placeholder={`${email}`}
          disabled
        />

        <input
          className="p-2 w-full rounded-lg text-black"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <input
          className="p-2 w-full rounded-lg text-black"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={
            handlePassword // Call handlePassword with the new value
            //validatePassword(password, confirmPassword); // Optionally validate
          }
        />
        <input
          className="p-2 w-full rounded-lg text-black"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={
            handleConfirmPassword // Call handleConfirmPassword with the new value
            //validatePassword(password, confirmPassword);
          }
        />
        {validatePassword && error && <p className="text-red-600">{error}</p>}
        {validPassword && (
          <button
            href="/home/feed"
            className="p-2 rounded-lg bg-blue-500 w-1/3  hover:bg-blue-700"
            onClick={() => {
              confirmUser();
            }}
          >
            Sign Up
          </button>
        )}
      </form>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className=" bg-white p-8 rounded-lg shadow-lg w-2/3">
          <h1 className="text-2xl text-center text-black mb-4">Success!</h1>
          <p className="text-black">
            You have successfully registered. Clock in{" "}
            <Link
              className="text-blue-500"
              href="/api/auth/signin?callbackUrl=/home/feed"
            >
              {" "}
              here
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
