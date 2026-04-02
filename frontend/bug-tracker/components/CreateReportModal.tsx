import {useState} from "react"
import {ReportData, CompletionStatus} from "@/lib/types"
type CreateReportModalProps = {
    header: string;
    intialData: ReportData;
    onClose: () => void;
    onCreate: (data: ReportData) => void;
};

export default function CreateReportModal({header, intialData, onClose, onCreate}: CreateReportModalProps){
      // For report form
    const [id, setID] = useState(intialData.id);
    const [name, setName] = useState(intialData.name);
    const [description, setDescription] = useState(intialData.description);
    const [importance, setImportance] = useState(intialData.importance); // when undefined it sets a default value specified in report_schema
    const [status, setStatus] = useState(intialData.status);
    
    return(
    <div className="bg-surface fixed inset-0 flex justify-center items-center">
 
        <div className="flex flex-col gap-2 bg-surface w-full max-w-md p-8">            
            <h1 className="text-3xl">{header}</h1>
            <p>Name:</p>
            <input className="border"type="text" value = {name} placeholder={intialData.name} onChange={(e)=>setName(e.target.value)}/>
            <p>Description:</p>
            <input className="border" type="text" value = {description} placeholder={intialData.description} onChange={(e)=>setDescription(e.target.value)} />
            <p>Importance: </p>
            <select value={importance ?? ""} onChange={e => setImportance(Number(e.target.value))} className="border p-2 w-full rounded">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>    
            <p>Status: </p>
            <select value={status ?? ""} onChange={e => setStatus(e.target.value as CompletionStatus)} className="border p-2 w-full rounded">
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="completed">Completed</option>
            </select>            
            <button className=" text-xl border mb-2 cursor-pointer" onClick={()=>{onCreate({id, name, importance, description, status}); onClose()}}>Submit</button>
            <button className=" text-xl border cursor-pointer self-end"onClick={onClose}>Close this thingy</button>
        </div>
    </div>
    )
}