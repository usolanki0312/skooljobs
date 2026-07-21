import { resolveOptions } from "./config";
import { decodeImage } from "./decodeImage";
import { computeBlurScore } from "./blurDetection";
import { classifyImage } from "./contentModeration";

function fail(reason) {
  return { valid: false, reason };
}

function formatSize(bytes) {
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;
}

/**
 * Validates an uploaded image file before it's allowed into the app's state/storage.
 * `contextOrOptions` is either a preset name from IMAGE_CONTEXTS ("photo" | "logo" |
 * "cover" | "gallery") or a partial options object overriding the defaults.
 *
 * Resolves to { valid: true } or { valid: false, reason: string }. Never throws -
 * unexpected decode/model errors are converted into a rejection (or, if
 * `failClosedOnModerationError` is false, moderation errors are swallowed and the
 * upload proceeds on the other checks so a model-loading hiccup can't brick uploads).
 */
export async function validateProfileImage(file, contextOrOptions) {
  const opts = resolveOptions(contextOrOptions);

  if (!file) return fail("No file selected.");

  if (!opts.allowedTypes.includes(file.type)) {
    return fail("Unsupported file type. Please upload a JPG, PNG, or WEBP image.");
  }
  if (file.size > opts.maxFileSizeBytes) {
    return fail(`Image is too large. Maximum size is ${formatSize(opts.maxFileSizeBytes)}.`);
  }
  if (file.size < opts.minFileSizeBytes) {
    return fail("This file is too small or empty to be a valid image.");
  }

  let img;
  try {
    img = await decodeImage(file);
  } catch {
    return fail("This file could not be read as an image. Please upload a valid JPG, PNG, or WEBP file.");
  }

  if (img.naturalWidth < opts.minWidth || img.naturalHeight < opts.minHeight) {
    return fail(`Image resolution is too low. Please upload an image at least ${opts.minWidth}x${opts.minHeight}px.`);
  }

  const aspectRatio = img.naturalWidth / img.naturalHeight;
  if (aspectRatio > opts.maxAspectRatio || aspectRatio < 1 / opts.maxAspectRatio) {
    return fail("Image dimensions look unusual. Please upload a properly cropped image.");
  }

  if (opts.checkBlur) {
    const sharpness = computeBlurScore(img);
    if (sharpness < opts.minSharpness) {
      return fail("This image appears blurry or low quality. Please upload a clearer photo.");
    }
  }

  if (opts.moderationEnabled) {
    try {
      const moderation = await classifyImage(img);
      if (moderation.rejected) {
        return fail(moderation.reason);
      }
      if (opts.rejectDrawings && (moderation.scores.Drawing || 0) >= opts.drawingThreshold) {
        return fail("This looks like a drawing or graphic rather than a photo. Please upload an actual photograph.");
      }
    } catch (err) {
      if (opts.failClosedOnModerationError) {
        return fail("We couldn't verify this image right now. Please try again.");
      }
      console.warn("Image moderation check failed; allowing upload on other checks.", err);
    }
  }

  return { valid: true };
}
