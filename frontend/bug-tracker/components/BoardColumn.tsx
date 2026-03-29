import { Report } from "@/lib/types";
import ReportCard from "@/components/ReportCard"
type column = {
    title: string;
    reports: Report[];
    onMove: (id: number, newStatus: string) => void;
}

export default function Column({title, reports, onMove} : column){
    return (
    <div className="flex flex-col gap-3"style={{ width: 300 }}>
      <h2>{title}</h2>

      {reports.map((report) => (
        <ReportCard key ={report.id} report={report} onMove={onMove}/>
      ))}
    </div>
  );
}