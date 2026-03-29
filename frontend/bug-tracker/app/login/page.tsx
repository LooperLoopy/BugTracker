"use client"
import { useRouter } from "next/navigation"
import {useState} from "react"
import {login} from "@/lib/auth"

export default function SignUpPage(){
    const router = useRouter();
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleLogin(){
        const data = await login(loginInput, password);
        localStorage.setItem("access_token", data.access_token);
        router.push("/dashboard")
    }

    return (
        <div className="flex flex-col gap-4 mx-auto my-auto text-black bg-white px-5 py-5">
            <h1 className="text-3xl">Log in</h1>
            <input value = {loginInput} type="text" placeholder="Email or Username" onChange = {(e)=>{setLoginInput(e.target.value)}}/>
            <input type="password" value={password} placeholder = "Password" onChange = {(e)=>setPassword(e.target.value)}/>
            <button className="cursor-pointer" onClick={handleLogin}>Log in</button>
            <button className = "cursor-pointer" onClick={()=>{router.push("/signup")}}>Sign up instead</button>

        </div>
    )
}