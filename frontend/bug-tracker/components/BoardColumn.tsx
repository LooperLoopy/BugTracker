import { Report, ReportData } from "@/lib/types";
import ReportCard from "@/components/ReportCard"
import { useState, useEffect } from "react";
type column = {
    title: string;
    reports: Report[];
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;
    onEdit: (data: ReportData) => void;
}

enum sortKey {
  Name_AZ = "NAMEAZ",
  Name_ZA = "NAMEZA",
  Priority_HIGH = "PRIHIGH",
  Priority_LOW = "PRILOW",
  Date_RECENT = "DATEREC",
  Date_OLD = "DATEOLD",
}

export default function Column({title, reports, onMove, onDelete, onEdit} : column){
    const [sortValue, setSortValue] = useState(sortKey.Name_AZ);
    const [ref_reports, setReports] = useState<any[]>(reports);

    useEffect(() => {
      setReports(reports);
      reports.map((report) => (
        console.log(report.date_added)
      ));
      changeSort(sortValue);
    }, [reports]);

    async function changeSort(sortType: sortKey) {
      setSortValue(sortType);

      let sortBy;

      switch (sortType) {
        case sortKey.Name_AZ:
          sortBy = (a: Report, b: Report) => a.name.localeCompare(b.name);
          break;
        case sortKey.Name_ZA:
          sortBy = (a: Report, b: Report) => b.name.localeCompare(a.name);
          break;
        case sortKey.Priority_HIGH:
          sortBy = (a: Report, b: Report) => b.importance - a.importance;
          break;
        case sortKey.Priority_LOW:
          sortBy = (a: Report, b: Report) => a.importance - b.importance;
          break;
        case sortKey.Date_RECENT:
          sortBy = (a: Report, b: Report) =>
            new Date(b.date_added).getTime() - new Date(a.date_added).getTime();
          break;
        case sortKey.Date_OLD:
          sortBy = (a: Report, b: Report) =>
            new Date(a.date_added).getTime() - new Date(b.date_added).getTime();
          break;
        default:
          sortBy = (a: Report, b: Report) => a.name.localeCompare(b.name);
      }

      setReports(prev => [...prev].sort(sortBy));
    }

    return (
    <div className="bg-background">
      <div id="column-header" className="gap-3 flex flex-row items-start">
          <div className="p-1 border text-center bg-surface">
            <h2>{title}</h2>
          </div>
          <div className="p-1 border bg-surface text-[0.6rem]">{reports.length}</div>
            <select value={sortValue} onChange={e => changeSort(e.target.value as sortKey)} className="border p-2 bg-surface text-white max-w-28 text-[0.55rem] rounded">
                <option className="text-white" value={sortKey.Name_AZ}>Name A-Z</option>
                <option className="text-white" value={sortKey.Name_ZA}>Name Z-A</option>
                <option className="text-white" value={sortKey.Priority_HIGH}>Highest Priority</option>
                <option className="text-white" value={sortKey.Priority_LOW}>Lowest Priority</option>
                <option className="text-white" value={sortKey.Date_RECENT}>Recent</option>
                <option className="text-white" value={sortKey.Date_OLD}>Oldest</option>
            </select>
      </div>



      <div className="flex flex-col overflow-y-auto max-h-[80vh] p-2 gap-2 bg-background mt-2" >
        {ref_reports.map((report) => (
          <ReportCard key ={report.id} report={report} onMove={onMove} onDelete={onDelete} onEdit={onEdit}/>
        ))}
      </div>

    </div>
  );
}