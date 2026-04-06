import {useState} from "react"
import {X} from "lucide-react"
import {ReportData, CompletionStatus} from "@/lib/types"

type CreateReportModalProps = {
    header: string;
    intialData: ReportData;
    onClose: () => void;
    onCreate: (data: ReportData) => void;
};

export default function CreateReportModal({header, intialData, onClose, onCreate}: CreateReportModalProps){
    const [id, setID] = useState(intialData.id);
    const [name, setName] = useState(intialData.name);
    const [description, setDescription] = useState(intialData.description);
    const [importance, setImportance] = useState(intialData.importance);
    const [status, setStatus] = useState(intialData.status);
    
    return(
        <div className="bg-black/50 fixed inset-0 flex justify-center items-center p-4"
            onClick={e => { e.stopPropagation(); onClose(); }}
        >
            <div className="flex flex-col gap-2 bg-surface w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={e => { e.stopPropagation(); }}
            >            
                <h1 className="text-3xl">{header}</h1>
                <p>Name:</p>
                <input className="border" type="text" value={name} placeholder={intialData.name} onChange={(e) => setName(e.target.value)}/>
                <p>Description:</p>
                <textarea
                    className="border resize-y h-32 min-h-24"
                    name="text"
                    rows={6}
                    value={description}
                    placeholder={intialData.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p>Importance:</p>
                <select value={importance ?? ""} onChange={e => setImportance(Number(e.target.value))} className="border p-2 w-full rounded">
                    <option className="text-black" value="0">0</option>
                    <option className="text-black" value="1">1</option>
                    <option className="text-black" value="2">2</option>
                    <option className="text-black" value="3">3</option>
                </select>    
                <p>Status:</p>
                <select value={status ?? ""} onChange={e => setStatus(e.target.value as CompletionStatus)} className="border p-2 w-full rounded">
                    <option className="text-black" value="not_started">Not Started</option>
                    <option className="text-black" value="in_progress">In Progress</option>
                    <option className="text-black" value="testing">Testing</option>
                    <option className="text-black" value="completed">Completed</option>
                </select>            
                <button className="text-xl border mb-2 cursor-pointer" onClick={() => { onCreate({id, name, importance, description, status}); onClose(); }}>Submit</button>
                <button 
                    className="text-xl cursor-pointer self-end absolute top-4 right-4 w-10 h-10 flex items-center justify-center p-1 rounded-full bg-transparent hover:bg-gray-700 transition-colors duration-300"
                    onClick={onClose}
                >
                    <X strokeWidth={2.5} className="text-gray-500 w-8 h-8" />
                </button>
            </div>
        </div>
    )
}