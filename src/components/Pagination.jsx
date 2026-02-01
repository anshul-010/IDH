export default function Pagination({ page, pageCount, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-slate-600">
        Page <b>{page}</b> of <b>{pageCount}</b>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Prev
        </button>

        <button
          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
