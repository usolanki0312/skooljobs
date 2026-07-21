// The @cloudstrytech/ui-components Select requires options as { label, value }
// pairs, but the JSON dropdown catalogs store plain string lists — normalize here.
export const toOptions = (list) =>
  (list || []).map((item) =>
    typeof item === "object" && item !== null
      ? item
      : { label: item, value: item },
  );

export const toOptionsMap = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, toOptions(value)]),
  );
