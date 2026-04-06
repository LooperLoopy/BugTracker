"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/lib/auth";
import { Mail, LockKeyhole, User } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  async function handleSignUp() {
    const data = await signup(emailInput, usernameInput, passwordInput);
    localStorage.setItem("access_token", data.access_token);
    router.push("/dashboard");
  }

  return (
    <div className="rounded flex items-center flex-col gap-4 mx-auto my-auto bg-surface px-8 py-8">
      <h1 className="text-3xl">Sign Up</h1>
      <div className="rounded pl-2 pr-10 py-1 flex flex-row border items-center gap-2">
        <Mail className="h-4 w-4"></Mail>
        <input
          className="outline-none text-sm rounded"
          type="email"
          value={emailInput}
          placeholder="Email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <div className="rounded pl-2 pr-10 py-1 flex flex-row border items-center gap-2">
        <User className="h-4 w-4"></User>
        <input
          className="outline-none text-sm rounded"
          type="text"
          value={usernameInput}
          placeholder="Username"
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </div>
      <div className="rounded pl-2 pr-10 py-1 flex flex-row border items-center gap-2">
        <LockKeyhole className="h-4 w-4"></LockKeyhole>
        <input
          className="outline-none text-sm rounded"
          type="password"
          value={passwordInput}
          placeholder="Password"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <button
        className="w-100/100 cursor-pointer bg-green-500/50 py-1 rounded text-md"
        onClick={() => handleSignUp()}
      >
        Sign Up
      </button>
      <div className="text-xs flex flex-row gap-1">
        <p className="brightness-80">Already have an account?</p>
        <button
          className="cursor-pointer text-white"
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
