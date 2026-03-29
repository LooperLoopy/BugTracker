"use client"
import { useRouter } from "next/navigation"
import { useState} from "react"
import {signup} from "@/lib/auth"
export default function SignUpPage(){
    const router = useRouter();
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    async function handleSignUp(){
        const data = await signup(emailInput, usernameInput, passwordInput)
        localStorage.setItem("access_token", data.access_token);
        router.push("/dashboard");
    }

    return (
        <div className="flex flex-col gap-4 mx-auto my-auto bg-white text-black px-5 py-5">
            <h1 className="text-3xl">Sign Up</h1>
            <input type="email" value ={emailInput} placeholder="Email" onChange={(e)=>setEmailInput(e.target.value)}/>
            <input type="text" value = {usernameInput} placeholder="Username" onChange = {(e)=>setUsernameInput(e.target.value)}/>
            <input type="password" value = {passwordInput} placeholder = "Password" onChange = {(e)=>setPasswordInput(e.target.value)}/>
            <button className="cursor-pointer" onClick={()=>handleSignUp()}>Sign Up</button>
            <button className = "cursor-pointer" onClick={()=>{router.push("/login")}}>Log in instead</button>

        </div>
    )
}