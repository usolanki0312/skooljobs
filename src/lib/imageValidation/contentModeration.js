import { MODERATION_THRESHOLDS } from "./config";

// nsfwjs ships its model weights inside the package itself (no CDN fetch at
// runtime), so classification runs fully offline in the browser - consistent
// with this app's client-only/mocked-backend architecture. The model + tfjs
// are dynamically imported so they only load when a user actually uploads an
// image, not on initial app load.
//
// Importing the top-level "nsfwjs" package pulls in all three of its bundled
// models (MobileNetV2 + MobileNetV2Mid + InceptionV3, ~28MB combined) because
// its default model registry statically imports all of them. We only need
// MobileNetV2, so we import it and the loader directly via nsfwjs's own
// subpath exports to keep the shipped bundle to just that one model (~3.5MB).
let modelPromise = null;

function getModel() {
  if (!modelPromise) {
    modelPromise = Promise.all([
      import("nsfwjs/core"),
      import("nsfwjs/models/mobilenet_v2"),
    ])
      .then(([{ load }, { MobileNetV2Model }]) =>
        load("MobileNetV2", { modelDefinitions: [MobileNetV2Model] }),
      )
      .catch((err) => {
        modelPromise = null; // allow retry on next upload
        throw err;
      });
  }
  return modelPromise;
}

// Warms the model cache without blocking anything; safe to call speculatively
// (e.g. when an upload UI mounts) so the first real classification is fast.
export function preloadModerationModel() {
  getModel().catch(() => {});
}

export async function classifyImage(img) {
  const model = await getModel();
  const predictions = await model.classify(img);

  const scores = {};
  predictions.forEach((prediction) => {
    scores[prediction.className] = prediction.probability;
  });

  for (const [className, threshold] of Object.entries(MODERATION_THRESHOLDS)) {
    if ((scores[className] || 0) >= threshold) {
      return {
        rejected: true,
        reason:
          "This image was flagged as inappropriate for a professional platform. Please upload a suitable profile-related photo.",
        scores,
      };
    }
  }

  return { rejected: false, scores };
}
