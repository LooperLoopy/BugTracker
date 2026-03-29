import {useState} from "react"
import {CreateReportData, CompletionStatus} from "@/lib/types"
type CreateReportModalProps = {
    onClose: () => void;
    onCreate: (data: CreateReportData) => void;
};

export default function CreateReportModal({onClose, onCreate}: CreateReportModalProps){
      // For report form
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState<number | undefined>(); // when undefined it sets a default value specified in report_schema
    const [status, setStatus] = useState<CompletionStatus | undefined>();
    return(
    <div className="fixed inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-white text-black">
            <h1>Create a report</h1>
            <input type="text" value = {name} placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" value = {description} placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
            <select value={importance ?? ""} onChange={e => setImportance(Number(e.target.value))} className="border p-1 w-full rounded">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>    
            <select value={status ?? ""} onChange={e => setStatus(e.target.value as CompletionStatus)} className="border p-1 w-full rounded">
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="completed">Completed</option>
            </select>            
            <button className="mb-2 cursor-pointer" onClick={()=>{onCreate({name, importance, description, status}); onClose()}}>Submit</button>
            <button className="cursor-pointer"onClick={onClose}>Close this thingy</button>
        </div>
    </div>
    )
}