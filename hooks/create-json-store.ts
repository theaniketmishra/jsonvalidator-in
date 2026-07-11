import { create } from "zustand";

export interface JsonWorkspaceState {
  input: string;
  output: string;
  history: string[];
  historyIndex: number;
  setInput: (value: string, opts?: { record?: boolean }) => void;
  setOutput: (value: string) => void;
  loadSample: (sample: string) => void;
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const HISTORY_LIMIT = 100;

/**
 * Creates an isolated Zustand store for a single tool's editor workspace.
 * Each tool page instantiates its own store instance so state never leaks
 * between, e.g., the Formatter and the Repair tool.
 */
export function createJsonStore(initialInput = "") {
  return create<JsonWorkspaceState>((set, get) => ({
    input: initialInput,
    output: "",
    history: initialInput ? [initialInput] : [],
    historyIndex: initialInput ? 0 : -1,

    setInput: (value, opts) => {
      const record = opts?.record ?? true;
      if (!record) {
        set({ input: value });
        return;
      }
      const { history, historyIndex } = get();
      const truncated = history.slice(0, historyIndex + 1);
      const nextHistory = [...truncated, value].slice(-HISTORY_LIMIT);
      set({ input: value, history: nextHistory, historyIndex: nextHistory.length - 1 });
    },

    setOutput: (value) => set({ output: value }),

    loadSample: (sample) => {
      const { history, historyIndex } = get();
      const truncated = history.slice(0, historyIndex + 1);
      const nextHistory = [...truncated, sample].slice(-HISTORY_LIMIT);
      set({ input: sample, history: nextHistory, historyIndex: nextHistory.length - 1 });
    },

    clear: () => {
      const { history, historyIndex } = get();
      const truncated = history.slice(0, historyIndex + 1);
      const nextHistory = [...truncated, ""].slice(-HISTORY_LIMIT);
      set({ input: "", output: "", history: nextHistory, historyIndex: nextHistory.length - 1 });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex <= 0) return;
      const nextIndex = historyIndex - 1;
      set({ input: history[nextIndex], historyIndex: nextIndex });
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex >= history.length - 1) return;
      const nextIndex = historyIndex + 1;
      set({ input: history[nextIndex], historyIndex: nextIndex });
    },

    canUndo: () => get().historyIndex > 0,
    canRedo: () => get().historyIndex < get().history.length - 1,
  }));
}

export type JsonStore = ReturnType<typeof createJsonStore>;
