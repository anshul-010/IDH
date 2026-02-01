import { useMemo, useState } from "react";

function Node({ name, value, depth = 0 }) {
  const [open, setOpen] = useState(false);

  const keys = useMemo(() => {
    if (!value || typeof value !== "object") return [];
    return Object.keys(value);
  }, [value]);

  const hasChildren = keys.length > 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((s) => !s)}
        className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-slate-100 ${
          depth === 0 ? "font-extrabold text-slate-900" : "font-semibold text-slate-700"
        }`}
        style={{ paddingLeft: 12 + depth * 14 }}
      >
        <span className="w-4 text-slate-400">
          {hasChildren ? (open ? "▾" : "▸") : ""}
        </span>
        <span className="truncate">{name}</span>
      </button>

      {open && hasChildren && (
        <div className="mt-1">
          {keys.map((k) => (
            <Node key={`${name}/${k}`} name={k} value={value[k]} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ categories }) {
  const topKeys = useMemo(() => Object.keys(categories || {}), [categories]);

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 pt-4 pb-3 border-b border-slate-100">
        <div className="text-sm font-extrabold text-slate-900">Economic Monitor</div>
        <div className="text-xs text-slate-500">Browse categories</div>
      </div>

      <div className="p-2">
        {topKeys.map((k) => (
          <Node key={k} name={k} value={categories[k]} depth={0} />
        ))}
      </div>
    </div>
  );
}
