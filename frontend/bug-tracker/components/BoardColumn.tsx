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
      <div className="bg-surface text-center w-auto">
      <h2>{title}</h2>
      </div>
      <p>Sort By: </p>
            <select value={""} onChange={e => changeSort(e.target.value)} className="border p-2 w-full rounded">
                <option className="text-black" value="Name">Name</option>
                <option className="text-black" value="Priority">Priority</option>
                <option className="text-black" value="Date Added">Date Added</option>
                <option className="text-black" value="Descending">Descending</option>
                <option className="text-black" value="Ascending">Ascending</option>
            </select>

      <div className="mt-2 flex flex-col gap-3 overflow-y-auto max-h-[80vh]" style={{ width: 250 }}>
        {reports.map((report) => (
          <ReportCard key ={report.id} report={report} onMove={onMove} onDelete={onDelete} onEdit={onEdit}/>
        ))}
      </div>

    </div>
  );
}