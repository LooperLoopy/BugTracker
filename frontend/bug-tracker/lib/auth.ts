
//Functions like signup / login and token stuff
const BASE_URL = "http://localhost:8000"
export async function signup(email: string, username: string, password: string){
    const res = await fetch(`${BASE_URL}/user/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password 
        })


    })
    const data = await res.json()
    localStorage.setItem("token",data.access_token)
    if (!res.ok) throw new Error("Login failed")
    return data
}

export async function login(login: string, password: string){
    const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password
            })
    })
    const data = await res.json()
    localStorage.setItem("token",data.access_token)
    if (!res.ok) throw new Error("Login failed")
    return data
}