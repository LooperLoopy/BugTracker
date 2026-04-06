import { Report, ReportData } from "@/lib/types"
import ReportModal from "@/components/ReportModal";
import { useState } from "react";
import {Ellipsis, Pencil, Trash2} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type ReportCardProps = {

    report: Report
    onMove: (id: number, newStatus: string) => void;
    onDelete: (id: number) => void;
    onEdit: (data: ReportData) => void;
    colour: string;
}
export default function ReportCard({report, onMove, onDelete, onEdit, colour}: ReportCardProps){
    const[showReport, toggleReportView] = useState(false);
  const [openInEditMode, setOpenInEditMode] = useState(false);
  const priorityBadgeClass =
    report.importance === 0
      ? "bg-red-500/15 text-red-700/80"
      : report.importance === 1
        ? "bg-blue-500/15 text-blue-700/80"
        : report.importance === 2
          ? "bg-purple-500/15 text-purple-700/80"
          : "bg-gray-500/15 text-gray-300/80";

    return(
        <div 
            style={{ borderTopColor: colour }}
            className="border-t-4 border-{colour} p-2 relative bg-surface flex flex-col rounded bg-gray-500"
          onClick={() => {
            setOpenInEditMode(false);
            toggleReportView(true);
          }}
        >
          <ReportModal
            report={report}
            isOpen={showReport}
            editMode={openInEditMode}
            onRequestClose={() => {
              toggleReportView(false);
              setOpenInEditMode(false);
            }}
            onEdit={onEdit}
          />

            {/**<div className="absolute top-0 right-0"
                onClick={e => e.stopPropagation()}
            >
                <button className="border m-2 cursor-pointer" onClick={()=>onDelete(report.id)}>delete</button>
            </div>**/}
                <div className="flex flex-row justify-between mb-1 w-full">
                <strong className="text-lg truncate min-w-0">{`${report.name || "null"}`}</strong>
                <div className={`w-fit px-2 py-[2px] h-fit flex items-center justify-center ${priorityBadgeClass}`}>
                <p className="text-[0.65rem]">{`P${report.importance}`}</p>

                </div>
                </div>
                <div className="w-100/100 line-clamp-2 break-words whitespace-pre-line mb-3 brightness-95 text-sm">
                    {report.description || "No Description"}
                </div>

            <div className="flex flex-row justify-between">
                <div id="status and date" className="flex flex-row items-end gap-[5px]">
            <div className="flex items-center cursor-pointer relative w-fit bg-white px-1 py-[1px] rounded-md"onClick={e => e.stopPropagation()}>
                
                <select
                    value={report.status}
                    onChange={e => onMove(report.id, e.target.value)}
                    className="p-1 rounded-md bg-surface text-[0.65rem] cursor-pointer"
                >
                    <option className="cursor-pointer"value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="testing">Testing</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
                <div className="px-[4px] bg-gray-700/50 text-gray-200/50 text-[0.55rem] text-center py-[2px]">
                {report.date_added.slice(0,10).split("-").reverse().join("/")}
                </div>                
                </div>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild onClick={e => e.stopPropagation()}>
    <div className="h-3 flex items-center bg-gray-500/20 absolute bottom-[6px] rounded-xs right-[6px] cursor-pointer">
      <Ellipsis className="w-8 h-5 text-gray-300 brightness-70" />
    </div>
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className="border bg-surface rounded shadow-lg w-36 z-50"
      side="right"
      align="start"
      onClick={e => e.stopPropagation()}
    >
              <DropdownMenu.Item
        className="flex flex-row gap-2 items-center px-3 py-2 text-[0.8rem] hover:bg-[#0A64C8] cursor-pointer outline-none"
                onClick={() => {
                  setOpenInEditMode(true);
                  toggleReportView(true);
                }}
      >
        <Pencil className="w-4 h-4"/>
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item
        className="px-3 py-2 flex flex-row gap-2 text-red-500/80 items-center text-[0.8rem] text-gray-700 hover:bg-[#0A64C8] cursor-pointer outline-none"
        onClick={() => onDelete(report.id)}
      >
        <Trash2 className="w-4 h-4"/>
        Delete
      </DropdownMenu.Item>

    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
            </div>

            
        </div>

    )
}