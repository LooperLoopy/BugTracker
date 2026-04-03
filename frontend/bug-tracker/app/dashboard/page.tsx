"use client";
import {ReportData} from "@/lib/types"
import Image from "next/image";
import { useParams } from "next/navigation";
import { getReport, getReports, createReport, updateReport, deleteReport } from "@/lib/api"; // should i be importing one by one... lol
import { useState, useEffect } from "react";
import Column from "@/components/BoardColumn";
import CreateReportModal from "@/components/CreateReportModal";
import {CirclePlus, CircleX, Search} from "lucide-react";
export default function Home() {
  const { id } = useParams();
  const [reports, setReports] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);
  const[showCreateForm, toggleCreateForm] = useState(false);
  const [showSearchX, toggleSearchX] = useState(false);
  const[searchText, setSearchText] = useState("");


  // useEffect(() => {
  //   if (!id) return;
  //   fetchReport(Number(id));
  // }, [id]);

  useEffect(() => {
    fetchReports(); // get nothing!
  }, []);

  async function fetchReport(id: number) { // don't know if we actually need this.
    try {
      const data = await getReport(id);
      setReport(data);
    } catch (error: any) {
      console.error("An error occurred:", error.message);
    }
  }

  async function fetchReports() {
    try {
      const data = await getReports();
      console.log(data)
      setReports(data);
    } catch (error: any) {
      console.error("An error occurred:", error.message);
    }
  }

  async function handleCreate(data: ReportData) {
    const created_report = await createReport(
    data
    );
    console.log(created_report)

    fetchReports();
  }

  async function handleEdit(data: ReportData) {
    if (data.id == undefined){
      return;
    }

    const id = data.id || 0;
    const name = data.name;
    const description = data.description;
    const importance = data.importance;
    const status = data.status;

    await updateReport({id, name, description, importance, status});

    fetchReports();
  }

  async function handleDelete(id: number){
    deleteReport(id)

    fetchReports();
  }

  async function moveReport(id: number, status: string) {
    await updateReport({id, status});

    fetchReports();
  }

  const notStarted = reports.filter(r => r.status === "not_started");
  const inProgress = reports.filter(r => r.status === "in_progress");
  const testing = reports.filter(r => r.status === "testing");
  const completed = reports.filter(r => r.status === "completed");

  const empty: ReportData = {name: "", description: ""};

  // html starts here ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col h-screen bg-surface">
      <div id="REAL-header" className="w-full bg-background flex justify-center mb-3">

      <div id="parent-header"className="w-95/100 mt-10 mb-5 bg-background">

             <h1 className="self-start text-4xl font-bold">Bug Report Tracker</h1>

      <div id="header"className="flex flex-row justify-between w-full">
      <div className="flex flex-col">
      <div id="searchbar" className="mt-auto rounded-md bg-surface border-1 flex flex-row items-center gap-3 px-3">
                  <Search className="w-7 h-7"></Search>
        <input value={searchText} onChange={(e)=>setSearchText(e.target.value)}id="search" className="max-w-40 text-xl py-2 outline-none bg-surface " type="text" placeholder="Search.."></input>
          <CircleX
            className={`${searchText.trim() === "" ? "invisible" : ""}`}
            onClick={(e)=>setSearchText("")}
          />      
          </div>
      </div>

        <button className=" flex flex-row items-center gap-3 rounded-md border-1 bg-surface text-2xl cursor-pointer px-5 py-3" onClick={()=>toggleCreateForm(!showCreateForm)}>Create a Report
          <CirclePlus className="w-10 h-10"></CirclePlus>
        </button>      
        </div>
      </div>


      </div>

 


      <div className="bg-surface w-full justify-center flex-1 flex overflow-hidden"style={{ display: "flex", gap: 20 }}>
        <Column
          title="Not Started"
          reports={notStarted}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
          colour={"#972f2f"}
        />
        <Column
          title="In Progress"
          reports={inProgress}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
          colour={"#d38166"}
        />
        <Column
          title="Testing"
          reports={testing}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
          colour={"#f4e29b"}
        />
        <Column
          title="Completed"
          reports={completed}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
          colour={"#75be76"}
        />

          {showCreateForm && <CreateReportModal header="Create a Report" intialData={empty} onClose={()=>toggleCreateForm(false)} onCreate={handleCreate}/>}
      </div>
    </div>
  ); // yea this just pumps out an error because the database is empty.. AND we unauthorized
}
