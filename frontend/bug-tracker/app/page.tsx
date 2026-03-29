"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { getReport, getReports, createReport } from "@/lib/api"; // should i be importing one by one... lol
import { useState, useEffect } from "react";

export default function Home() {
  const { id } = useParams();
  const [reports, setReports] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);

  // For report form
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(""); // TODO: yo how is the author handled pls help
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
    setAuthor(""); // TODO: idek what to with with the author stuff......
    setDescription("");
    setImportance(undefined);
    setStatus(undefined);

    fetchReports();
  }

  // html starts here ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1>Reports</h1>

      {reports.map((r) => (
        <div key={r.id}>
          <h2>{r.name}</h2>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  ); // yea this just pumps out an error because the database is empty..
}
