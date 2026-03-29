"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { getReport, getReports, createReport, updateReport } from "@/lib/api"; // should i be importing one by one... lol
import { useState, useEffect } from "react";
import Column from "@/components/BoardColumn";

export default function Home() {
  const { id } = useParams();
  const [reports, setReports] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);

  // For report form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState<number | undefined>(); // when undefined it sets a default value specified in report_schema
  const [status, setStatus] = useState<string | undefined>();

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
      setReports(data);
    } catch (error: any) {
      console.error("An error occurred:", error.message);
    }
  }

  async function handleCreate() {
    await createReport({
      name,
      description,
      ...(importance !== undefined && { importance }),
      ...(status && { status }),
    });

    // reset
    setName("");
    setDescription("");
    setImportance(undefined);
    setStatus(undefined);

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
    <div>
      <h1>Reports</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <Column
          title="Not Started"
          reports={notStarted}
          onMove={moveReport}
        />
        <Column
          title="In Progress"
          reports={inProgress}
          onMove={moveReport}
        />
        <Column
          title="Testing"
          reports={testing}
          onMove={moveReport}
        />
        <Column
          title="Completed"
          reports={completed}
          onMove={moveReport}
        />
      </div>
    </div>
  ); // yea this just pumps out an error because the database is empty.. AND we unauthorized
}
