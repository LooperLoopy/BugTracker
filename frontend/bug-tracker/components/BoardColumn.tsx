import { Report } from "@/lib/types";

type column = {
    title: string;
    reports: Report[];
    onMove: (id: number, newStatus: string) => void;
}

export default function Column({title, reports, onMove} : column){
    return (
    <div style={{ width: 300 }}>
      <h2>{title}</h2>

      {reports.map((report) => (
        <div
          key={report.id}
          style={{
            border: "1px solid black",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <strong>{report.name}</strong>
          <p>{report.description}</p>

          {/* Move buttons (temp)*/}
          <button onClick={() => onMove(report.id, "not_started")}>
            Not Started
          </button>
          <button onClick={() => onMove(report.id, "in_progress")}>
            In Progress
          </button>
          <button onClick={() => onMove(report.id, "testing")}>
            Testing
          </button>
          <button onClick={() => onMove(report.id, "completed")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}