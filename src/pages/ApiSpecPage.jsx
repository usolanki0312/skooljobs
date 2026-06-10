import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import GithubSlugger from "github-slugger";

import apiMd from "../../API Specification/api.md?raw";
import dataModel from "../../Datamodel/datamodel.json";
import { buildServicesToc } from "../lib/apiDocToc";
import { useDocsTheme } from "../lib/useDocsTheme";

import "highlight.js/styles/github-dark.css";
import "../styles/apiDoc.css";

const mdPlugins = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeHighlight],
};

// Render each collection in datamodel.json as a `### name` + json block,
// so highlight.js / rehype-slug treat it exactly like the rest of the doc.
function buildDataModelMd(collections) {
  let out =
    "## Data Model\n\n" +
    "> Source of truth: `Datamodel/datamodel.json`. Edit there to update this section.\n\n";
  for (const [name, def] of Object.entries(collections)) {
    out += `### ${name}\n\n\`\`\`json\n${JSON.stringify(def, null, 2)}\n\`\`\`\n\n`;
  }
  return out;
}

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const SidebarGroup = ({ label, items }) => (
  <div className="mb-5">
    <p className="mb-1.5 px-2 text-xs font-bold uppercase tracking-wide text-slate-400">
      {label}
    </p>
    <ul className="space-y-0.5">
      {items.map((it) => (
        <li key={it.slug}>
          <button
            type="button"
            onClick={() => scrollTo(it.slug)}
            className="w-full truncate rounded-lg px-2 py-1.5 text-left text-sm text-slate-600 transition hover:bg-primary/10 hover:text-primary"
          >
            {it.title}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default function ApiSpecPage() {
  const [theme, toggleTheme] = useDocsTheme();
  const { endpointsMd, dataModelMd, servicesToc, dataModelToc } = useMemo(() => {
    const endpointsMd = apiMd.split(/^## Data Model/m)[0];
    const collections = dataModel.collections || {};
    const slugger = new GithubSlugger();
    return {
      endpointsMd,
      dataModelMd: buildDataModelMd(collections),
      servicesToc: buildServicesToc(endpointsMd),
      dataModelToc: Object.keys(collections).map((name) => ({
        title: name,
        slug: slugger.slug(name),
      })),
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "docs-dark" : "bg-white"}`}>
      {/* Fixed navbar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between gap-3 bg-primary px-5 text-white shadow-md">
        <span className="truncate text-sm font-bold sm:text-base">
          SkoolJobs API — Endpoint Reference
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
            to="/api-specification-and-datamodel/swagger"
            className="rounded-lg border border-white/40 px-3 py-1.5 text-xs font-bold transition hover:bg-white/15 sm:text-sm"
          >
            OAS Swagger UI
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="docs-sidebar sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-borderColor bg-light/40 p-4 lg:block">
          <SidebarGroup label="Services" items={servicesToc} />
          <SidebarGroup label="Data Model" items={dataModelToc} />
        </aside>

        {/* Content */}
        <main className="api-doc min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <ReactMarkdown {...mdPlugins}>{endpointsMd}</ReactMarkdown>
            <ReactMarkdown {...mdPlugins}>{dataModelMd}</ReactMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
}
