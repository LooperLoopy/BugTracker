import { Report, ReportData } from "@/lib/types"
import ReportModal from "@/components/ReportModal";
import { useState } from "react";
type ReportCardProps = {

    report: Report
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;
    onEdit: (data: ReportData) => void;
}
export default function ReportCard({report, onMove, onDelete, onEdit}: ReportCardProps){
    const[showReport, toggleReportView] = useState(false);

    return(
        <div 
            className="border-t-4 p-2 relative bg-surface flex flex-col rounded bg-gray-500"
            onClick={() => toggleReportView(true)}
        >
            <ReportModal report={report} isOpen={showReport} onRequestClose={() => toggleReportView(false)} onEdit={onEdit}/>

            {/**<div className="absolute top-0 right-0"
                onClick={e => e.stopPropagation()}
            >
                <button className="border m-2 cursor-pointer" onClick={()=>onDelete(report.id)}>delete</button>
            </div>**/}
                <div className="flex flex-row justify-between mb-3">
                <strong>{`${report.name || "null"}`}</strong>
                <p>{`P${report.importance}`}</p>
                </div>


            <div className="w-fit bg-white px-1 py-[1px] rounded-md"onClick={e => e.stopPropagation()}>
                <select
                    value={report.status}
                    onChange={e => onMove(report.id, e.target.value)}
                    className="p-1 rounded-md bg-surface text-xs"
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