"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Clock, Briefcase, FileText, CheckCircle2 } from "lucide-react";
import { WorkLogService } from "@/services/worklog.service";
import { WorkEntry } from "@/types/worklog";

interface AddWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: Omit<WorkEntry, "id" | "date">) => void;
  initialInput?: string;
}

export function AddWorkModal({ isOpen, onClose, onAddEntry, initialInput = "" }: AddWorkModalProps) {
  const [project, setProject] = useState("Dayflow");
  const [task, setTask] = useState("Employee Dashboard");
  const [activity, setActivity] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(200); // 3h 20m
  const [showSmartPreview, setShowSmartPreview] = useState(false);

  useEffect(() => {
    if (initialInput) {
      const parsed = WorkLogService.parseNaturalLanguage(initialInput);
      setProject(parsed.project);
      setTask(parsed.task);
      setActivity(parsed.activity);
      setDurationMinutes(parsed.suggestedMinutes);
      setShowSmartPreview(true);
    } else {
      setActivity("");
      setShowSmartPreview(false);
    }
  }, [initialInput, isOpen]);

  const handleActivityChange = (val: string) => {
    setActivity(val);
    if (val.trim().length > 15) {
      const parsed = WorkLogService.parseNaturalLanguage(val);
      setProject(parsed.project);
      setTask(parsed.task);
      setShowSmartPreview(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    onAddEntry({
      project,
      task: task || "General Task",
      activity,
      durationMinutes,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add work"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        {/* Project Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6E637F] mb-1 font-sora">
            Project
          </label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0F0] rounded-xl text-sm font-medium text-[#241B35] focus:outline-none focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
          >
            <option value="Dayflow">Dayflow</option>
            <option value="CampusConnect">CampusConnect</option>
            <option value="Smart Parking">Smart Parking</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Work Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6E637F] mb-1 font-sora">
            What did you work on?
          </label>
          <textarea
            rows={3}
            value={activity}
            onChange={(e) => handleActivityChange(e.target.value)}
            placeholder="Describe what you worked on..."
            className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0F0] rounded-xl text-sm font-medium text-[#241B35] focus:outline-none focus:border-[#5B3778] focus:ring-2 focus:ring-[#EFE6F5]"
            required
          />
        </div>

        {/* Duration / Time Input */}
        <div className="p-3.5 rounded-xl bg-[#F7F2FB] border border-[#E6E0F0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5B3778]" />
            <span className="text-xs font-semibold text-[#241B35]">
              Suggested time: <span className="font-mono text-[#5B3778] font-bold">{WorkLogService.formatMinutes(durationMinutes)}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDurationMinutes(Math.max(30, durationMinutes - 30))}
              className="w-7 h-7 rounded-lg border border-[#E6E0F0] bg-white text-xs font-bold text-[#241B35] hover:bg-[#EFE6F5]"
            >
              -
            </button>
            <span className="text-xs font-bold text-[#241B35] w-12 text-center font-mono">
              {WorkLogService.formatMinutes(durationMinutes)}
            </span>
            <button
              type="button"
              onClick={() => setDurationMinutes(durationMinutes + 30)}
              className="w-7 h-7 rounded-lg border border-[#E6E0F0] bg-white text-xs font-bold text-[#241B35] hover:bg-[#EFE6F5]"
            >
              +
            </button>
          </div>
        </div>

        {/* Smart AI Understanding Preview */}
        {showSmartPreview && (
          <div className="p-3.5 rounded-xl bg-[#EFE6F5]/60 border border-[#5B3778]/30 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B3778]">
              <Sparkles className="w-3.5 h-3.5 text-[#5B3778]" />
              <span>✨ Dayflow understood</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#6E637F] font-medium">Project:</span>{" "}
                <strong className="text-[#241B35]">{project}</strong>
              </div>
              <div>
                <span className="text-[#6E637F] font-medium">Task:</span>{" "}
                <strong className="text-[#241B35]">{task || "Employee Dashboard"}</strong>
              </div>
              <div>
                <span className="text-[#6E637F] font-medium">Activity:</span>{" "}
                <strong className="text-[#241B35]">Attendance UI</strong>
              </div>
              <div>
                <span className="text-[#6E637F] font-medium">Suggested duration:</span>{" "}
                <strong className="text-[#5B3778] font-mono">{WorkLogService.formatMinutes(durationMinutes)}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-[#E6E0F0]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
            Add to Work Log
          </Button>
        </div>
      </form>
    </Modal>
  );
}
