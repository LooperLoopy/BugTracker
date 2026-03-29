"use client"
import { useRouter } from "next/navigation"


export default function SignUpPage(){
    const router = useRouter()

    return (
        <div className="flex flex-col gap-4 mx-auto my-auto">
            <h1 className="text-3xl">Sign Up</h1>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder = "Password" />
            <button className="bg-white text-black">Sign Up</button>
            <button className = "bg-white text-black" onClick={()=>{router.push("/login")}}>Log in instead</button>

        </div>
    )
}