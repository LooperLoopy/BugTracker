"use client"
import { useRouter } from "next/navigation"
import {useState} from "react"
import {login} from "@/lib/auth"
import {Mail, LockKeyhole} from "lucide-react"

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
        <div className="rounded flex items-center flex-col gap-4 mx-auto my-auto bg-surface px-8 py-8">
            <h1 className="text-3xl">Log in</h1>

            <div className="rounded pl-2 pr-10 py-1 flex flex-row border items-center gap-2">
                <Mail className="h-4 w-4"></Mail>
                <input className="outline-none text-sm rounded" value = {loginInput} type="text" placeholder="Email or username" onChange = {(e)=>{setLoginInput(e.target.value)}}/>
            </div>
            <div className="rounded pl-2 pr-10 py-1 flex flex-row border items-center gap-2">
                            <LockKeyhole className="h-4 w-4"></LockKeyhole>
            <input className=" text-sm rounded outline-none"type="password" value={password} placeholder = "Password" onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            
            <button className="w-100/100 cursor-pointer bg-green-500/50 py-1 rounded text-md" onClick={handleLogin}>Log in</button>
            <div className="text-xs flex flex-row gap-1">
                <p className="brightness-80">Don't have an account yet?</p>
                        <button className = "cursor-pointer text-white " onClick={()=>{router.push("/signup")}}>Sign up</button>
            </div>
        </div>
    )
}