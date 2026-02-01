export function normalizeFrequent(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => ({
    id: String(x.id ?? ""),
    title: String(x.title ?? ""),
    cat: x.cat ? String(x.cat) : "",
    subCat: x.subCat ? String(x.subCat) : "",
  }));
}
