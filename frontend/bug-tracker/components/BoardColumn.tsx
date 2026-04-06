import { Report, ReportData } from "@/lib/types";
import ReportCard from "@/components/ReportCard";
import { useState, useEffect } from "react";
import { Circle } from "lucide-react";
type column = {
  title: string;
  reports: Report[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onEdit: (data: ReportData) => void;
  colour: string;
};

enum sortKey {
  Name_AZ = "NAMEAZ",
  Name_ZA = "NAMEZA",
  Priority_HIGH = "PRIHIGH",
  Priority_LOW = "PRILOW",
  Date_RECENT = "DATEREC",
  Date_OLD = "DATEOLD",
}

export default function Column({
  title,
  reports,
  onMove,
  onDelete,
  onEdit,
  colour,
}: column) {
  const [sortValue, setSortValue] = useState(sortKey.Name_AZ);
  const [ref_reports, setReports] = useState<any[]>(reports);

  useEffect(() => {
    setReports(reports);
    reports.map((report) => console.log(report.date_added));
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
      case sortKey.Priority_LOW:
        sortBy = (a: Report, b: Report) => b.importance - a.importance;
        break;
      case sortKey.Priority_HIGH:
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

    setReports((prev) => [...prev].sort(sortBy));
  }

  return (
    <div className="bg-background h-98/100 w-22/100 shrink-0 px-2">
      <div
        id="column-header"
        className="gap-3 flex flex-row items-end justify-between mt-3"
      >
        <div id="holds title and count" className="flex flex-row items-end gap-1.5">
          <div className="w-30 rounded-xs py-[5px] px-2 border text-center items-center bg-surface flex flex-row gap-2">
            <Circle className="h-5 w-5" style={{ color: colour }} />
            <h2 className="rounded-xs text-[0.8rem] truncate">{title}</h2>
          </div>
          <div className="rounded-xs px-[12px] py-[2px] border bg-surface text-[0.65rem]">
            {reports.length >= 10 ? reports.length : `${0}${reports.length}`}
          </div>
        </div>

        <div className="bg-white py-[1px] rounded-md px-[2.5] flex items-center justify-center">
          <select
            value={sortValue}
            onChange={(e) => changeSort(e.target.value as sortKey)}
            className=" py-[1px] px-[0.5px] bg-surface text-white max-w-28 text-[0.6rem] rounded cursor-pointer"
          >
            <option className="text-white cursor-pointer" value={sortKey.Name_AZ}>
              Name A-Z
            </option>
            <option className="text-white cursor-pointer" value={sortKey.Name_ZA}>
              Name Z-A
            </option>
            <option className="text-white cursor-pointer" value={sortKey.Priority_HIGH}>
              Highest Priority
            </option>
           <option className="text-white cursor-pointer" value={sortKey.Priority_LOW}>
              Lowest Priority
            </option>
            <option className="text-white cursor-pointer" value={sortKey.Date_RECENT}>
              Recent
            </option>
            <option className="text-white cursor-pointer" value={sortKey.Date_OLD}>
              Oldest
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-250px)] gap-2 bg-background mt-2">
        {ref_reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onMove={onMove}
            onDelete={onDelete}
            onEdit={onEdit}
            colour={colour}
          />
        ))}
      </div>
    </div>
  );
}
