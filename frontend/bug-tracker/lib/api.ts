const BASE_URL = "http://localhost:8000"
//Functions that fetch from our api routes, and return json objects. Put Report functions here, login signup in other file
export async function getReport(id: number){
    const token = localStorage.getItem("token") //get the token
    const res = await fetch(`${BASE_URL}/reports/${id}`,{
        headers: {Authorization: `Bearer ${token}`} //passing the token idk
    })
    if (!res.ok) throw new Error("Failed to fetch report")
    return res.json() //extract the body of the response object as json
}