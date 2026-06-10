import GithubSlugger from "github-slugger";

// Build the "Services" sidebar group from the endpoint markdown.
// Slugs are produced the same way rehype-slug does (github-slugger), in
// document order, so the links match the rendered heading ids.
// Returns [{ title, slug }] for every `## <X> service` heading.
export function buildServicesToc(md) {
  const slugger = new GithubSlugger();
  const services = [];
  let inFence = false;

  for (const line of md.split("\n")) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (!m) continue;

    const level = m[1].length;
    const text = m[2].trim();
    const slug = slugger.slug(text); // keep slugger in sync with rehype-slug

    if (level === 2 && /\sservice$/i.test(text)) {
      services.push({ title: text.replace(/\s+service$/i, ""), slug });
    }
  }

  return services;
}
