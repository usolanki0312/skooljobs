import { useEffect, useState } from "react";

const KEY = "skooljobs_docs_theme";

// Shared light/dark theme for the API docs pages, persisted in localStorage
// so the choice carries across the spec and swagger pages.
export function useDocsTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(KEY) || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return [theme, toggle];
}
