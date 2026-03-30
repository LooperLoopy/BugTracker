// When we click on a card this is the part that opens up

import { Report } from "@/lib/types"

type ReportModalProps = {
    report: Report
    isOpen: boolean
    onRequestClose: () => void
}

export default function ReportModal({report, isOpen, onRequestClose}: ReportModalProps){
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={e => { e.stopPropagation(); onRequestClose(); }}
        >
            <div 
                className="bg-white rounded-lg p-6 flex flex-col gap-2 min-w-[300px]"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    className="self-end text-gray-500 hover:text-black cursor-pointer"
                    onClick={onRequestClose}
                >
                    X
                </button>

                <strong>{`Name: ${report.name || "null"}`}</strong>
                <p>{`Description: ${report.description}`}</p>
                
                <button 
                    className="border self-end m-2 cursor-pointer"
                >
                    Edit
                </button>

            </div>
        </div>
    )
}