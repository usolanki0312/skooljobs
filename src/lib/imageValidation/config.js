// Shared defaults + per-context presets for client-side image upload validation.
// "context" lets callers relax/tighten checks for images that aren't literal
// photographs (e.g. school logos are graphics, so blur/drawing checks don't apply).

export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const DEFAULT_OPTIONS = {
  allowedTypes: ALLOWED_TYPES,
  maxFileSizeBytes: 8 * 1024 * 1024, // 8MB
  minFileSizeBytes: 1024, // 1KB - guards against empty/corrupt placeholder files
  minWidth: 150,
  minHeight: 150,
  maxAspectRatio: 4, // reject extreme strips (width:height or height:width beyond 4:1)
  checkBlur: true,
  minSharpness: 25, // variance-of-Laplacian threshold; higher = stricter
  moderationEnabled: true,
  failClosedOnModerationError: false, // if the moderation model fails to load, don't block uploads
  rejectDrawings: false,
  drawingThreshold: 0.85,
};

// NSFW moderation thresholds are intentionally context-independent: inappropriate
// content must be rejected everywhere regardless of upload type.
export const MODERATION_THRESHOLDS = {
  Porn: 0.4,
  Hentai: 0.4,
  Sexy: 0.7,
};

export const IMAGE_CONTEXTS = {
  // Headshot-style profile photo (teacher avatar, school representative photo)
  photo: {
    minWidth: 150,
    minHeight: 150,
    checkBlur: true,
    minSharpness: 25,
    rejectDrawings: true,
  },
  // Institute/company logo - graphic art is expected, so blur & drawing checks
  // (tuned for photographs) would misfire on flat-color/vector-style logos.
  logo: {
    minWidth: 80,
    minHeight: 80,
    checkBlur: false,
    rejectDrawings: false,
  },
  // Wide banner/cover image
  cover: {
    minWidth: 300,
    minHeight: 100,
    maxAspectRatio: 6,
    checkBlur: true,
    minSharpness: 15,
    rejectDrawings: false,
  },
  // Gallery/campus photos - real photographs expected
  gallery: {
    minWidth: 150,
    minHeight: 150,
    checkBlur: true,
    minSharpness: 20,
    rejectDrawings: false,
  },
};

export function resolveOptions(contextOrOptions) {
  if (typeof contextOrOptions === "string") {
    return { ...DEFAULT_OPTIONS, ...(IMAGE_CONTEXTS[contextOrOptions] || {}) };
  }
  return { ...DEFAULT_OPTIONS, ...(contextOrOptions || {}) };
}
