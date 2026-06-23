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
import styles from "./ApiSpecPage.module.css";

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
  <div className={styles.sidebarGroup}>
    <p className={styles.sidebarGroupLabel}>
      {label}
    </p>
    <ul className={styles.sidebarGroupList}>
      {items.map((it) => (
        <li key={it.slug}>
          <button
            type="button"
            onClick={() => scrollTo(it.slug)}
            className={styles.sidebarGroupButton}
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
    <div className={`${styles.page} ${theme === "dark" ? "docs-dark" : styles.pageLight}`}>
      {/* Fixed navbar */}
      <header className={styles.header}>
        <span className={styles.headerTitle}>
          SkoolJobs API — Endpoint Reference
        </span>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            className={styles.iconButton}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/api-specification-and-datamodel/swagger"
            className={styles.swaggerLink}
          >
            OAS Swagger UI
          </Link>
        </div>
      </header>

      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={`docs-sidebar ${styles.sidebar}`}>
          <SidebarGroup label="Services" items={servicesToc} />
          <SidebarGroup label="Data Model" items={dataModelToc} />
        </aside>

        {/* Content */}
        <main className={`api-doc ${styles.main}`}>
          <div className={styles.mainInner}>
            <ReactMarkdown {...mdPlugins}>{endpointsMd}</ReactMarkdown>
            <ReactMarkdown {...mdPlugins}>{dataModelMd}</ReactMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
}
