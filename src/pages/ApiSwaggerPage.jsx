import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import yaml from "js-yaml";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import openapiRaw from "../../API Specification/openapi.yaml?raw";
import { useDocsTheme } from "../lib/useDocsTheme";
import "../styles/swaggerDark.css";

// Parse the spec once (single source of truth = openapi.yaml).
const spec = yaml.load(openapiRaw);

export default function ApiSwaggerPage() {
  const [theme, toggleTheme] = useDocsTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "swagger-dark" : "bg-white"}`}>
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between gap-3 bg-primary px-5 text-white shadow-md">
        <span className="truncate text-sm font-bold sm:text-base">
          SkoolJobs API — OAS Swagger UI
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            className="rounded-lg border border-white/40 p-2 transition hover:bg-white/15"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/api-specification-and-datamodel"
            className="rounded-lg border border-white/40 px-3 py-1.5 text-xs font-bold transition hover:bg-white/15 sm:text-sm"
          >
            ← Back to spec
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
