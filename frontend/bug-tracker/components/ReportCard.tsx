import { Report } from "@/lib/types"
import ReportModal from "@/components/ReportModal";
import { useState } from "react";
type ReportCardProps = {

    report: Report
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;

}
export default function ReportCard({report, onMove, onDelete}: ReportCardProps){
    const[showReport, toggleReportView] = useState(false);

    return(
        <div 
            className="flex flex-col rounded bg-gray-500"
            onClick={() => toggleReportView(true)}
        >
            <ReportModal report={report} isOpen={showReport} onRequestClose={() => toggleReportView(false)}/>

            <div
                onClick={e => e.stopPropagation()}
            >
                <button className="border self-end m-2 cursor-pointer" onClick={()=>onDelete(report.id)}>delete</button>
            </div>
            
                <strong>{`Name: ${report.name || "null"}`}</strong>
                <p>{`Description: ${report.description}`}</p>

            <div onClick={e => e.stopPropagation()}>
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
            
        </div>

    )
}