"use client";
import { ViewerWorkspace } from "@/features/json-viewer/viewer-workspace";

// JSON Tree View is the same interactive tree as JSON Viewer; this wrapper
// exists so /json-tree-view can have its own SEO-targeted page/metadata
// while reusing the exact same tested component.
export function TreeViewWorkspace({ sample }: { sample: string }) {
  return <ViewerWorkspace sample={sample} />;
}
