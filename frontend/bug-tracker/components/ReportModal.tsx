// When we click on a card this is the part that opens up

import { Report, ReportData } from "@/lib/types"
import { useState } from "react"
import CreateReportModal from "./CreateReportModal"
import {X, Pencil} from "lucide-react"

type ReportModalProps = {
    report: Report
    isOpen: boolean
    onRequestClose: () => void
    onEdit: (data: ReportData) => void
}

export default function ReportModal({report, isOpen, onRequestClose, onEdit}: ReportModalProps){
    if (!isOpen) return null;
    const[showEditForm, toggleEditForm] = useState(false);
    const[isEditing, toggleEditMode] = useState(false);
    const initial: ReportData = {id: report.id, name: report.name, description: report.description, importance: report.importance, status: report.status};
    const [form, setForm] = useState({ name: report.name, description: report.description, importance: report.importance, status: report.status });

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
            onClick={e => { e.stopPropagation(); onRequestClose(); }}
        >
            <div 
                className="relative bg-surface rounded-lg p-6 flex flex-col w-70/100 max-h-[80vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="text-4xl sticky bg-surface border-b pb-1 flex justify-between gap-4">
                    {isEditing ? (
                    <input className="border rounded p-2 text-4xl font-bold bg-surface outline-none w-full" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    ) : (
                    <strong className="break-all mine-w-0">{report.name}</strong>
                    )}
                    <button 
                        className="cursor-pointer w-10 h-10 shrink-0 flex items-center justify-center p-1 rounded-full bg-transparent hover:bg-gray-700 transition-colors duration-300"
                        onClick={onRequestClose}
                    >
                        <X strokeWidth={2.5} className="text-gray-500 w-8 h-8" />
                    </button>

                </div>  
                
                <p >Description:</p>
                <div className="max-h[20vh] overflow-y-auto break-words whitespace-pre-line">
                {isEditing ? (
                <textarea className="w-full bg-surface border rounded p-2 outline-none resize-none" rows={5} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                ) : (
                <p className="p-2 w-full">{report.description}</p>
                )}
                </div>
                
                {isEditing? (
                    <div className="flex gap-2 self-end m-2">
                        <button className="border px-2 py-1 cursor-pointer"onClick={() => toggleEditMode(false)}>Cancel</button>
                        <button className="bg-green-500/50 border px-2 py-1 cursor-pointer"onClick={() => { onEdit({...form, id: report.id}); toggleEditMode(false); onRequestClose(); }}>Save</button>
                    </div>

                ): (
                <button 
                    className="flex flex-row gap-2 items-center border self-end m-2 cursor-pointer px-2 py-1"
                    onClick={()=>toggleEditMode(!isEditing)}
                >
                    <Pencil className="w-4 h-4 "/>
                    Edit
                </button>
                )}
                {showEditForm && <CreateReportModal header="Edit Report" intialData={initial} onClose={()=>toggleEditForm(false)} onCreate={onEdit}/>}

            </div>
        </div>
    )
}