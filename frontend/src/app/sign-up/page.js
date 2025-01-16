"use client";
import React, { useState } from "react";
import Link from "next/link";
import emailHandler from "@/app/sign-up/handler";
import Form from "@/app/sign-up/form";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [validEmail, setEmailValid] = useState(false);
  const [error, setError] = useState("");
  const [green, setGreen] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value); // Only set the value from the input field
    validateEmail(event.target.value); // Validate the email
  };

  const validateEmail = (email) => {
    // email validation regex from https://regexr.com/3e48o
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      setError("Please enter a valid email address."); // Show error message
      setGreen(""); // Clear success message
    } else {
      setGreen("This email is acceptable"); // Clear error message
      setError(""); // Show success message
    }
    return regex.test(email);
  };

  const confirmEmail = async (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      const res = await emailHandler(email);
      if (res) {
        setError("Email already exists. Please sign in."); // Show error message
        setGreen(""); // Clear success message
      } else {
        setEmailValid(true); // Mark the email as valid
        setError(""); // Clear error message
      }
    } else {
      setError("Please enter a valid email address."); // Show error message
      setGreen(""); // Clear success message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-2/3">
        <h1 className="text-2xl text-center text-black mb-4">Register</h1>
        <div className="flex items-center justify-center p-8 bg-gray-200 text-white rounded-lg">
          {!validEmail && (
            <form
              className="flex flex-col items-center justify-center gap-8 w-2/3"
              onSubmit={confirmEmail}
            >
              <input
                className="p-2 w-full rounded-lg text-black"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
              {error && <p className="text-red-600">{error}</p>}{" "}
              {green && <p className="text-green-600">{green}</p>}
              <button
                className="p-2 rounded-lg bg-blue-500 w-1/3  hover:bg-blue-700"
                type="submit"
              >
                Continue
              </button>
            </form>
          )}

          {validEmail && <Form email={email} />}
        </div>

        <div className="text-black">
          Already registered? Clock in{" "}
          <Link
            className="text-blue-500"
            href="/api/auth/signin?callbackUrl=/home/feed"
          >
            here
          </Link>
        </div>
      </div>
    </div>
  );
}
