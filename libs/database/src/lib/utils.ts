export function keyValueToMap<T>(data: { [key: string]: T }): Map<string, T> {
  const keys: string[] = Object.keys(data);
  const map: Map<string, T> = new Map();
  keys.forEach(key => map.set(key, data[key]));
  return map;
}

export function mapToKeyValuePair<T>(values: Map<string, T>) {
  const keyValuePair: { [key: string]: T } = {};
  values.forEach((value, key) => (keyValuePair[key] = value));
  return keyValuePair;
}
