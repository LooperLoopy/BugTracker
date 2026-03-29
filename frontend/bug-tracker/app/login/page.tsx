"use client"
import { useRouter } from "next/navigation"


export default function SignUpPage(){
    const router = useRouter()

    return (
        <div className="flex flex-col gap-4 mx-auto my-auto">
            <h1 className="text-3xl">Log in</h1>
            <input type="text" placeholder="Email or Username" />
            <input type="password" placeholder = "Password" />
            <button className="bg-white text-black">Log in</button>
            <button className = "bg-white text-black" onClick={()=>{router.push("/signup")}}>Sign up instead</button>

        </div>
    )
}