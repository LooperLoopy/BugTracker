// When we click on a card this is the part that opens up

import { Report, ReportData } from "@/lib/types";
import { useEffect, useState } from "react";
import CreateReportModal from "./CreateReportModal";
import { X, Pencil, Check } from "lucide-react";

type ReportModalProps = {
  report: Report;
  isOpen: boolean;
  editMode?: boolean;
  onRequestClose: () => void;
  onEdit: (data: ReportData) => void;
};

export default function ReportModal({
  report,
  isOpen,
  editMode = false,
  onRequestClose,
  onEdit,
}: ReportModalProps) {
  const normalizePriority = (value: number) =>
    Number.isInteger(value) && value >= 0 && value <= 3 ? value : 0;
  const [showEditForm, toggleEditForm] = useState(false);
  const [isEditing, toggleEditMode] = useState(false);
  const initial: ReportData = {
    id: report.id,
    name: report.name,
    description: report.description,
    importance: report.importance,
    status: report.status,
  };
  const [form, setForm] = useState({
    name: report.name,
    description: report.description,
    importance: normalizePriority(report.importance),
    status: report.status,
  });

  function startEditMode() {
    setForm({
      name: report.name,
      description: report.description,
      importance: normalizePriority(report.importance),
      status: report.status,
    });
    toggleEditMode(true);
  }

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      name: report.name,
      description: report.description,
      importance: normalizePriority(report.importance),
      status: report.status,
    });
    toggleEditMode(editMode);
  }, [isOpen, editMode, report]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
      onClick={(e) => {
        e.stopPropagation();
        onRequestClose();
      }}
    >
      <div
        className="relative bg-surface rounded-lg p-6 flex flex-col gap-3 w-70/100 max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl sticky bg-surface border-b pb-1 flex justify-between gap-4">
          {isEditing ? (
            <input
              className="border rounded p-2 text-4xl font-bold bg-surface outline-none w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            <strong className="break-all mine-w-0">{report.name}</strong>
          )}
          <button
            className="cursor-pointer w-10 h-10 shrink-0 flex items-center justify-center p-1 rounded-full bg-transparent hover:bg-gray-700 transition-colors duration-300"
            onClick={onRequestClose}
          >
            <X strokeWidth={2.5} className="text-gray-500 w-8 h-8" />
          </button>
        </div>

        <div className="max-h[20vh] overflow-y-auto break-words whitespace-pre-line">
          {isEditing ? (
            <div>
              <p>Description</p>
              <textarea
                className="w-full bg-surface border rounded p-2 outline-none resize-none"
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <p className="mt-4">Priority</p>
              <select
                className="w-full bg-surface border rounded p-2 outline-none"
                value={form.importance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    importance: normalizePriority(parseInt(e.target.value, 10)),
                  })
                }
              >
                <option value={0}>High (P0)</option>
                <option value={1}>Medium (P1)</option>
                <option value={2}>Low (P2)</option>
              </select>
            </div>
          ) : (
            <div>
              <p>Description</p>
              <p className="w-full text-gray-500">{report.description}</p>
              <p>Priority</p>
              <p className="text-gray-500">
                {report.importance === 0
                  ? "High (P0)"
                  : report.importance === 1
                    ? "Medium (P1)"
                    : report.importance === 2
                      ? "Low (P2)"
                      : "Lowest (P3)"}
              </p>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-2 self-end m-2">
            <button
              className="hover:brightness-80 duration-200 gap-0.5 flex flex-row items-center border px-2 py-1 cursor-pointer"
              onClick={() => {
                toggleEditMode(false);
                setForm({
                  name: report.name,
                  description: report.description,
                  importance: normalizePriority(report.importance),
                  status: report.status,
                });
              }}
            >
              <X className="w-5 h-5"></X>
              Cancel
            </button>
            <button
              className="gap-1 flex flex-row items-center bg-green-500/50 border px-2 py-1 cursor-pointer hover:brightness-90 duration-200"
              onClick={() => {
                onEdit({ ...form, id: report.id });
                toggleEditMode(false);
                onRequestClose();
              }}
            >
              <Check className="w-4.5 h-4.5"></Check>
              Save
            </button>
          </div>
        ) : (
          <button
            className="flex flex-row gap-2 items-center border self-end m-2 cursor-pointer px-2 py-1"
            onClick={startEditMode}
          >
            <Pencil className="w-4 h-4 " />
            Edit
          </button>
        )}
        {showEditForm && (
          <CreateReportModal
            header="Edit Report"
            intialData={initial}
            onClose={() => toggleEditForm(false)}
            onCreate={onEdit}
          />
        )}
      </div>
    </div>
  );
}
