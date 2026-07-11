"use client";

import * as React from "react";
import { ClipboardPaste, Upload, FileText, Trash2, Undo2, Redo2, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EditorToolbarProps {
  onPaste: (text: string) => void;
  onUpload: () => void;
  onSample: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional output-side actions rendered on the right. */
  outputActions?: React.ReactNode;
}

export function EditorToolbar({
  onPaste,
  onUpload,
  onSample,
  onClear,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  fileInputRef,
  onFileInputChange,
  outputActions,
}: EditorToolbarProps) {
  const toast = useToast();

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onPaste(text);
    } catch {
      toast.error("Clipboard access blocked", "Paste directly into the editor instead.");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={handlePasteClick}>
          <ClipboardPaste className="h-3.5 w-3.5" /> Paste
        </Button>
        <Button variant="ghost" size="sm" onClick={onUpload}>
          <Upload className="h-3.5 w-3.5" /> Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json,text/plain"
          className="hidden"
          onChange={onFileInputChange}
        />
        <Button variant="ghost" size="sm" onClick={onSample}>
          <FileText className="h-3.5 w-3.5" /> Sample
        </Button>
        <div className="mx-1 h-4 w-px bg-border" />
        <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo} aria-label="Undo">
          <Undo2 className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo} aria-label="Redo">
          <Redo2 className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear}>
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </Button>
      </div>
      {outputActions && <div className="flex flex-wrap items-center gap-1.5">{outputActions}</div>}
    </div>
  );
}

export function OutputActionButtons({
  onCopy,
  onDownload,
}: {
  onCopy: () => void;
  onDownload: () => void;
}) {
  return (
    <>
      <Button variant="outline" size="sm" onClick={onCopy}>
        <Copy className="h-3.5 w-3.5" /> Copy
      </Button>
      <Button variant="outline" size="sm" onClick={onDownload}>
        <Download className="h-3.5 w-3.5" /> Download
      </Button>
    </>
  );
}
