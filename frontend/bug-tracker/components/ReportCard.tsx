import { Report } from "@/lib/types"
type ReportCardProps = {
    report: Report
    onMove: (id: number, newStatus: string) => void;
}
export default function ReportCard({report, onMove}: ReportCardProps){
    return(
        <div style={{ border: "1px solid black", padding: 10, marginBottom: 10 }}>
            <strong>{report.name}</strong>
            <p>{report.description}</p>
            <button onClick={() => onMove(report.id, "not_started")}>Not Started</button>
            <button onClick={() => onMove(report.id, "in_progress")}>In Progress</button>
            <button onClick={() => onMove(report.id, "testing")}>Testing</button>
            <button onClick={() => onMove(report.id, "completed")}>Done</button>
        </div>

    )
}