export default function ProductTable({ items }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-end justify-between">
        <div>
          <div className="text-lg font-extrabold text-slate-900">
            New Releases <span className="text-slate-400 text-sm font-bold">({items.length})</span>
          </div>
          <div className="text-sm text-slate-500">Frequent indicators / results</div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-200 text-indigo-700 bg-indigo-50">
          Frequent
        </span>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-sm">No records in this dataset.</div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left px-5 py-3 font-extrabold">Title</th>
                <th className="text-left px-5 py-3 font-extrabold w-56">Category</th>
                <th className="text-left px-5 py-3 font-extrabold w-64">Subcategory</th>
                <th className="text-left px-5 py-3 font-extrabold w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="font-bold text-slate-900 leading-snug">{r.title}</div>
                    <div className="text-xs text-slate-500">{r.id}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{r.cat || "-"}</td>
                  <td className="px-5 py-3 text-slate-700">{r.subCat || "-"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <button className="p-2 rounded-xl hover:bg-slate-100" title="View">👁️</button>
                      <button className="p-2 rounded-xl hover:bg-slate-100" title="Open">📄</button>
                      <button className="p-2 rounded-xl hover:bg-slate-100" title="Pin">⭐</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
