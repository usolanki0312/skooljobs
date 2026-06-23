import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import yaml from "js-yaml";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import openapiRaw from "../../API Specification/openapi.yaml?raw";
import { useDocsTheme } from "../lib/useDocsTheme";
import "../styles/swaggerDark.css";
import styles from "./ApiSwaggerPage.module.css";

// Parse the spec once (single source of truth = openapi.yaml).
const spec = yaml.load(openapiRaw);

export default function ApiSwaggerPage() {
  const [theme, toggleTheme] = useDocsTheme();

  return (
    <div className={`${styles.page} ${theme === "dark" ? "swagger-dark" : styles.pageLight}`}>
      <header className={styles.header}>
        <span className={styles.headerTitle}>
          SkoolJobs API — OAS Swagger UI
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
            to="/api-specification-and-datamodel"
            className={styles.backLink}
          >
            ← Back to spec
          </Link>
        </div>
      </header>

      <div className={styles.body}>
        <SwaggerUI spec={spec} />
      </div>
    </div>
  );
}
