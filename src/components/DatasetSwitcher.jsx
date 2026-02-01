export default function DatasetSwitcher({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 text-sm font-bold outline-none"
    >
      <option className="text-slate-900" value="INDIA_STATES">India & States</option>
      <option className="text-slate-900" value="IMF">Dataset – IMF</option>
    </select>
  );
}
