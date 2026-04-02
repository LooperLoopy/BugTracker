// When we click on a card this is the part that opens up

import { Report, ReportData } from "@/lib/types"
import { useState } from "react"
import CreateReportModal from "./CreateReportModal"

type ReportModalProps = {
    report: Report
    isOpen: boolean
    onRequestClose: () => void
    onEdit: (data: ReportData) => void
}

export default function ReportModal({report, isOpen, onRequestClose, onEdit}: ReportModalProps){
    if (!isOpen) return null;
    const[showEditForm, toggleEditForm] = useState(false);

    const initial: ReportData = {id: report.id, name: report.name, description: report.description, importance: report.importance, status: report.status};

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
            onClick={e => { e.stopPropagation(); onRequestClose(); }}
        >
            <div 
                className="bg-surface rounded-lg p-6 flex flex-col w-70/100 overflow-y-auto max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                                <div className="text-4xl sticky top-0 bg-surface border-b flex justify-between">
                <strong className="">{`${report.name || "null"}`}</strong>
                <button 
                    className="self-end text-gray-500 hover:text-black cursor-pointer"
                    onClick={onRequestClose}
                >
                    X
                </button>

                </div>

                <p >Description:</p>
                <div className="max-h[20vh]">
                <p className="">{`${report.description}`}</p>
                
                </div>
                
                <button 
                    className="border self-end m-2 cursor-pointer"
                    onClick={()=>toggleEditForm(!showEditForm)}
                >
                    Edit
                </button>
                {showEditForm && <CreateReportModal header="Edit Report" intialData={initial} onClose={()=>toggleEditForm(false)} onCreate={onEdit}/>}

            </div>
        </div>
    )
}