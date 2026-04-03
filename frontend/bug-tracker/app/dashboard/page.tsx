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
    <div className="flex flex-col items-center justify-center h-screen ">
              <h1 className="self-start text-5xl font-bold m-5 ">Bug Report Tracker</h1>

      <div id="header"className="mb-5 flex flex-row justify-between w-90/100">
      <div id="searchbar" className="rounded-sm bg-surface border-1 flex flex-row items-center gap-3 px-3">
                  <Search className="w-7 h-7"></Search>
        <input value={searchText} onChange={(e)=>setSearchText(e.target.value)}id="search" className="outline-none bg-surface " type="text" placeholder="Search.."></input>
          <CircleX
            className={`${searchText.trim() === "" ? "invisible" : ""}`}
            onClick={(e)=>setSearchText("")}
          />      
          </div>
        <button className=" flex flex-row items-center gap-3 rounded-sm border-1 bg-surface text-2xl cursor-pointer px-5 py-1 h-max" onClick={()=>toggleCreateForm(!showCreateForm)}>Create a Report
          <CirclePlus className="w-7 h-7"></CirclePlus>
        </button>      
        </div>


      <div className="bg-surface w-full justify-center flex-1 flex overflow-hidden"style={{ display: "flex", gap: 20 }}>
        <Column
          title="Not Started"
          reports={notStarted}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Column
          title="In Progress"
          reports={inProgress}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Column
          title="Testing"
          reports={testing}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <Column
          title="Completed"
          reports={completed}
          onMove={moveReport}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

          {showCreateForm && <CreateReportModal header="Create Report" intialData={empty} onClose={()=>toggleCreateForm(false)} onCreate={handleCreate}/>}
      </div>
    </div>
  ); // yea this just pumps out an error because the database is empty.. AND we unauthorized
}
