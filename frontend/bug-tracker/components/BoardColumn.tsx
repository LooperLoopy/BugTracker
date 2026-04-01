import { Report, ReportData } from "@/lib/types";
import ReportCard from "@/components/ReportCard"
type column = {
    title: string;
    reports: Report[];
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;
    onEdit: (data: ReportData) => void;
}

export default function Column({title, reports, onMove, onDelete, onEdit} : column){
    async function changeSort(sortType:string) {
      return;
    }

    return (
    <div>
      
      <h2>{title}</h2>
      <p>Sort By: </p>
            <select value={""} onChange={e => changeSort(e.target.value)} className="border p-2 w-full rounded">
                <option value="Name">Name</option>
                <option value="Priority">Priority</option>
                <option value="Date Added">Date Added</option>
            </select>
            <select value={"Descending"} onChange={e => changeSort(e.target.value)} className="border p-2 w-full rounded">
                <option value="Descending">Descending</option>
                <option value="Ascending">Ascending</option>
            </select>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[80vh]" style={{ width: 300 }}>
        {reports.map((report) => (
          <ReportCard key ={report.id} report={report} onMove={onMove} onDelete={onDelete} onEdit={onEdit}/>
        ))}
      </div>

    </div>
  );
}