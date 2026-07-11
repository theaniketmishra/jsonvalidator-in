import * as React from "react";
import { useToast } from "./use-toast";

export function useLoadFromUrl(onLoad: (contents: string) => void) {
  const [url, setUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const load = React.useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmed);
    } catch {
      toast.error("Enter a valid URL", "Include the protocol, e.g. https://example.com/data.json");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(parsedUrl.toString(), { headers: { Accept: "application/json,text/plain,*/*" } });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const text = await res.text();
      onLoad(text);
      toast.success("Loaded from URL", parsedUrl.hostname);
    } catch {
      toast.error(
        "Couldn't load that URL",
        "The site may block cross-origin requests (CORS). Try downloading the file and using Upload instead."
      );
    } finally {
      setIsLoading(false);
    }
  }, [url, onLoad, toast]);

  return { url, setUrl, load, isLoading };
}
