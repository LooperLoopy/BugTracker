import { Report, ReportData } from "@/lib/types"
import ReportModal from "@/components/ReportModal";
import { useState } from "react";
import {Ellipsis} from "lucide-react";
type ReportCardProps = {

    report: Report
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;
    onEdit: (data: ReportData) => void;
    colour: string;
}
export default function ReportCard({report, onMove, onDelete, onEdit, colour}: ReportCardProps){
    const[showReport, toggleReportView] = useState(false);
    const [showElipsisMenu, toggleElipsisMenu] = useState(false);
    return(
        <div 
            style={{ borderTopColor: colour }}
            className="border-t-4 border-{colour} p-2 relative bg-surface flex flex-col rounded bg-gray-500"
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
                <div className="bg-red-500/20 w-fit px-2 py-[2px] h-fit flex items-center justify-center">
                <p className="text-[0.65rem] text-red-300/50">{`P${report.importance}`}</p>

                </div>
                </div>

            <div className="flex flex-row justify-between">
            <div className="relative w-fit bg-white px-1 py-[1px] rounded-md"onClick={e => e.stopPropagation()}>
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
            <div className="bg-gray-500/50 absolute bottom-[6px] rounded-sm right-[6px] cursor-pointer">
                <Ellipsis className="w-7 h-4"/>


            </div>
            </div>

            
        </div>

    )
}