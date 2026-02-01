export default function Loader({ title, subtitle }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-10 text-center">
      <div className="mx-auto h-10 w-10 rounded-full border-4 border-slate-200 border-t-brand-900 animate-spin" />
      <div className="mt-4 font-extrabold text-slate-900">{title}</div>
      {subtitle && <div className="mt-1 text-sm text-slate-500">{subtitle}</div>}
    </div>
  );
}
