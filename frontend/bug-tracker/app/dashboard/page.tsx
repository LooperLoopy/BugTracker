"use client";
import {CreateReportData} from "@/lib/types"
import Image from "next/image";
import { useParams } from "next/navigation";
import { getReport, getReports, createReport, updateReport, deleteReport } from "@/lib/api"; // should i be importing one by one... lol
import { useState, useEffect } from "react";
import Column from "@/components/BoardColumn";
import CreateReportModal from "@/components/CreateReportModal";


export default function Home() {
  const { id } = useParams();
  const [reports, setReports] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);
  const[showCreateForm, toggleCreateForm] = useState(false);



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

  async function handleCreate(data: CreateReportData) {
    const created_report = await createReport(
    data
    );
    console.log(created_report)

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

  // html starts here ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl">Reports</h1>

      <div className=""style={{ display: "flex", gap: 20 }}>
        <Column
          title="Not Started"
          reports={notStarted}
          onMove={moveReport}
          onDelete={handleDelete}
        />
        <Column
          title="In Progress"
          reports={inProgress}
          onMove={moveReport}
          onDelete={handleDelete}
        />
        <Column
          title="Testing"
          reports={testing}
          onMove={moveReport}
          onDelete={handleDelete}
        />
        <Column
          title="Completed"
          reports={completed}
          onMove={moveReport}
          onDelete={handleDelete}
        />
        <button className="bg-white text-black text-2xl cursor-pointer px-2 py-2 h-max" onClick={()=>toggleCreateForm(!showCreateForm)}>Create a Report</button>
          {showCreateForm && <CreateReportModal onClose={()=>toggleCreateForm(false)} onCreate={handleCreate}/>}
      </div>
    </div>
  ); // yea this just pumps out an error because the database is empty.. AND we unauthorized
}
