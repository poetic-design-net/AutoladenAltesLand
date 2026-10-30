/** Preserve intentional empty values and editorial changes; only add absent fields. */
export function fillMissing(existing, defaults) {
  if (existing === undefined || existing === null) return structuredClone(defaults);
  if (!defaults || typeof defaults !== 'object' || Array.isArray(defaults)) return existing;
  return {
    ...existing,
    ...Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [key, fillMissing(existing[key], value)])
    ),
  };
}
/** Keep only schema fields, converting nested arrays to valid Sanity values. */
export async function toSanity(value, schema, upload, path = 'root') {
  if (value === undefined || value === null) return value;
  if (schema.type === 'image') {
    if (typeof value === 'object' && value.asset) return value;
    return upload(value, schema.title);
  }
  if (schema.type === 'array')
    return Promise.all(
      value.map(async (item, index) => {
        const member = schema.of.find((s) => s.type === item?._type) ?? schema.of[0];
        const result = await toSanity(item, member, upload, `${path}-${index}`);
        return result && typeof result === 'object'
          ? { ...result, _type: member.type, _key: item._key ?? `${path}-${index}` }
          : result;
      })
    );
  if (schema.fields) {
    const output = {};
    for (const field of schema.fields) {
      if (value[field.name] !== undefined)
        output[field.name] = await toSanity(
          value[field.name],
          field,
          upload,
          `${path}-${field.name}`
        );
    }
    return output;
  }
  return value;
}
