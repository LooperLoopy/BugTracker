const BASE_URL = "http://localhost:8000"
//Functions that fetch from our api routes, and return json objects. Put Report functions here, login signup in other file

// Get SINGLE report
export async function getReport(id: number){
    const token = localStorage.getItem("token") //get the token

    const res = await fetch(`${BASE_URL}/reports/${id}`,{
        headers: {Authorization: `Bearer ${token}`} //passing the token idk
    })

    if (!res.ok) throw new Error("Failed to fetch report")
    return res.json() //extract the body of the response object as json
}

// Get ALL REPORTS!!
export async function getReports() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/reports`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

// Create a report!!!!!!
export async function createReport(report: {
  name: string;
  description: string;
  importance?: number;
  status?: string;
}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/reports/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(report),
  });

  if (!res.ok) throw new Error("Failed to create report");

  return res.json();
}

// TODO: delete report, update report...