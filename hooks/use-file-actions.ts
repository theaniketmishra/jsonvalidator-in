import { useCallback, useRef, useState } from "react";
import { useToast } from "./use-toast";

interface UseFileActionsOptions {
  onLoad: (contents: string) => void;
  downloadFilename?: string;
}

export function useFileActions({ onLoad, downloadFilename = "data.json" }: UseFileActionsOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast();

  const readFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        onLoad(String(reader.result ?? ""));
        toast.success("File loaded", file.name);
      };
      reader.onerror = () => toast.error("Couldn't read file", "Please try again.");
      reader.readAsText(file);
    },
    [onLoad, toast]
  );

  const triggerUpload = useCallback(() => inputRef.current?.click(), []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) readFile(file);
      e.target.value = "";
    },
    [readFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) readFile(file);
    },
    [readFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const download = useCallback(
    (content: string, filename = downloadFilename) => {
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Downloaded", filename);
    },
    [downloadFilename, toast]
  );

  const copy = useCallback(
    async (content: string) => {
      try {
        await navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Couldn't copy", "Your browser blocked clipboard access.");
      }
    },
    [toast]
  );

  return {
    inputRef,
    isDragging,
    triggerUpload,
    handleFileInput,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    download,
    copy,
  };
}
