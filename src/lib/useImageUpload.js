import { useCallback, useState } from "react";
import { validateProfileImage } from "./imageValidation";

const GENERIC_ERROR = "We couldn't process this image. Please try a different file.";

/**
 * Wraps the existing "grab a File, turn it into an object URL" upload pattern
 * used across the app with validation/moderation, without changing how the
 * result is consumed (callers still get a plain blob URL string back).
 *
 * const { error, validating, validateAndProcess, clearError } = useImageUpload("photo");
 * const url = await validateAndProcess(file);
 * if (url) setProfileImage(url);
 */
export function useImageUpload(contextOrOptions) {
  const [error, setError] = useState(null);
  const [validating, setValidating] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  const validateAndProcess = useCallback(
    async (file) => {
      setError(null);
      if (!file) return null;

      setValidating(true);
      try {
        const result = await validateProfileImage(file, contextOrOptions);
        if (!result.valid) {
          setError(result.reason);
          return null;
        }
        return URL.createObjectURL(file);
      } catch {
        setError(GENERIC_ERROR);
        return null;
      } finally {
        setValidating(false);
      }
    },
    [contextOrOptions],
  );

  // For multi-file inputs (e.g. galleries): validates each file independently
  // and returns only the object URLs for files that passed.
  const validateAndProcessMultiple = useCallback(
    async (files) => {
      setError(null);
      const list = Array.from(files || []);
      if (list.length === 0) return [];

      setValidating(true);
      try {
        const urls = [];
        const failures = [];
        for (const file of list) {
          const result = await validateProfileImage(file, contextOrOptions);
          if (result.valid) {
            urls.push(URL.createObjectURL(file));
          } else {
            failures.push(`${file.name}: ${result.reason}`);
          }
        }
        if (failures.length > 0) setError(failures.join(" "));
        return urls;
      } catch {
        setError(GENERIC_ERROR);
        return [];
      } finally {
        setValidating(false);
      }
    },
    [contextOrOptions],
  );

  return { error, validating, validateAndProcess, validateAndProcessMultiple, clearError };
}
