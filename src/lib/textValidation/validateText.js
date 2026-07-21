import { containsProfanity } from "./profanityMatcher";

const DEFAULT_REASON =
  "This text contains language that isn't allowed on SkoolJobs. Please remove any profanity, hate speech, sexual content, or other inappropriate language and try again.";

/**
 * Validates a single piece of user-generated text for profanity/abusive
 * language, hate-related content, and sexually explicit content.
 *
 * Resolves to { valid: true } or { valid: false, reason: string }. An empty/
 * blank/non-string value is treated as valid here - required-field checks
 * are a separate concern already handled by each form.
 */
export function validateText(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return { valid: true };
  }
  if (containsProfanity(text)) {
    return { valid: false, reason: DEFAULT_REASON };
  }
  return { valid: true };
}

/**
 * Validates a map of { fieldKey: text } in one pass - convenient for
 * gating a multi-field submit (e.g. a job posting form) in a single call.
 *
 * Returns { valid: boolean, errors: { fieldKey: reason } } (errors is empty
 * when valid is true).
 */
export function validateFields(fields) {
  const errors = {};
  for (const [key, value] of Object.entries(fields || {})) {
    const result = validateText(value);
    if (!result.valid) errors[key] = result.reason;
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
