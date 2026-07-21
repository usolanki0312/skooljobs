// Generates a deterministic, illustrative banner image for a job posting
// entirely on the client (canvas -> PNG data URL). Stands in for a real
// AI-image-generation call: same inputs always render the same banner, no
// network request, no API key, no cost - fitting for an app with no real
// backend for anything else either.
const GRADIENTS = [
  ["#6366f1", "#8b5cf6"],
  ["#0ea5e9", "#22d3ee"],
  ["#f59e0b", "#f97316"],
  ["#10b981", "#059669"],
  ["#ec4899", "#f43f5e"],
  ["#14b8a6", "#0891b2"],
  ["#8b5cf6", "#d946ef"],
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  let lines = 0;
  for (const word of words) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, curY);
      line = `${word} `;
      curY += lineHeight;
      lines++;
      if (lines >= maxLines - 1) break;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}

export function generateJobBannerDataUrl({ title, subject, employmentType }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");

  const seed = `${title || ""}|${subject || ""}`;
  const [c1, c2] = GRADIENTS[hashString(seed) % GRADIENTS.length];

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(1020, 90, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, 570, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.font = "150px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("🎓", 64, 50);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 54px sans-serif";
  ctx.textBaseline = "alphabetic";
  wrapText(ctx, title || "New Job Opening", 68, 330, 1070, 62, 2);

  ctx.font = "30px sans-serif";
  ctx.globalAlpha = 0.9;
  const subtitle = [subject, employmentType].filter(Boolean).join("   ·   ");
  if (subtitle) ctx.fillText(subtitle, 68, 430);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/png");
}
