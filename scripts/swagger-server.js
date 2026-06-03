import express from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = join(__dirname, "../API Specification/openapi.yaml");

const spec = yaml.load(readFileSync(specPath, "utf8"));

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(spec, {
    customSiteTitle: "SkoolJobs API Docs",
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      persistAuthorization: true,
    },
  })
);

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`SkoolJobs Swagger UI running at http://localhost:${PORT}/api-docs`);
});
