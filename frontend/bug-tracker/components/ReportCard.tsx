import { Report } from "@/lib/types"
type ReportCardProps = {

    report: Report
    onMove: (id: number, newStatus: string) => void;
}
export default function ReportCard({report, onMove}: ReportCardProps){
    return(
        <div className="flex flex-col bg-gray-500">
            <button className="border self-end m-2 cursor-pointer">delete</button>
            <strong>{`Name: ${report.name || "null"}`}</strong>
            <p>{`Description: ${report.description}`}</p>
            <div>
                
            </div>
            <select 
                value={report.status} 
                onChange={e => onMove(report.id, e.target.value)}
                className="border p-1 rounded text-black bg-white"
            >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="completed">Completed</option>
            </select>
        </div>

    )
}