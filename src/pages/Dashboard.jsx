import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ProductTable from "../components/ProductTable.jsx";
import Pagination from "../components/Pagination.jsx";
import DatasetSwitcher from "../components/DatasetSwitcher.jsx";
import Loader from "../components/Loader.jsx";
import { loadDataset } from "../utils/datasetLoader.js";
import { normalizeFrequent } from "../utils/flattenData.js";

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [datasetKey, setDatasetKey] = useState("INDIA_STATES");
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;

    async function run() {
      setBusy(true);
      setErr("");
      setData(null);
      setPage(1);

      try {
        const payload = await loadDataset(datasetKey);

        // response2 may not have frequent in your snippet; handle safely
        const safe = {
          categories: payload?.categories || {},
          frequent: normalizeFrequent(payload?.frequent || []),
        };

        if (!alive) return;
        setData(safe);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Failed to load dataset");
      } finally {
        if (!alive) return;
        setBusy(false);
      }
    }

    run();
    return () => { alive = false; };
  }, [datasetKey]);

  const frequentAll = data?.frequent || [];
  const pageCount = Math.max(1, Math.ceil(frequentAll.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return frequentAll.slice(start, start + PAGE_SIZE);
  }, [frequentAll, page]);

  function logout() {
    localStorage.removeItem("demo_authed");
    localStorage.removeItem("demo_user");
    window.location.href = "/login";
  }

  return (
    <div className="min-h-full bg-blue-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className=" rounded-xl grid place-items-center font-extrabold">
            India
          </div>
          <div className="font-extrabold tracking-tight">DataHub</div>

          <div className="ml-4 flex-1 max-w-2xl hidden md:flex items-center bg-white/10 rounded-xl px-3 py-2 border border-white/10">
            <input
              className="w-full bg-transparent placeholder:text-white/60 outline-none text-sm"
              placeholder="Search indicators, datasets, categories…"
            />
          </div>

          <div className="ml-auto hidden md:flex items-center gap-4 text-sm text-white/85">
            <DatasetSwitcher value={datasetKey} onChange={setDatasetKey} />
            <span>Dashboard</span>
            <span>Calendar</span>
            <span>Help</span>
          </div>

          <button
            onClick={logout}
            className="ml-2 h-9 w-9 rounded-full bg-white/15 hover:bg-white/20 grid place-items-center font-extrabold"
            title="Logout"
          >
            {String(localStorage.getItem("demo_user") || "Logout")[0].toUpperCase()}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5">
        {busy && (
          <Loader
            title={`Loading ${datasetKey === "IMF" ? "Dataset – IMF" : "India & States"}…`}
            subtitle={
              datasetKey === "IMF"
                ? "Large dataset is parsed in a Web Worker to keep the UI responsive."
                : "Fetching catalogue…"
            }
          />
        )}

        {!busy && err && (
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6">
            <div className="font-extrabold text-slate-900">Could not load dataset</div>
            <div className="text-sm text-red-600 font-semibold mt-1">{err}</div>
          </div>
        )}

        {!busy && data && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
            {/* Sidebar */}
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden h-[calc(100vh-140px)]">
              <div className="px-4 py-4 border-b border-slate-100">
                <div className="font-extrabold text-slate-900">Economic Monitor</div>
                <div className="text-sm text-slate-500">
                  Dataset: {datasetKey === "IMF" ? "Dataset – IMF" : "India & States"}
                </div>
              </div>
              <Sidebar categories={data.categories} />
            </div>

            {/* Main */}
            <div className="space-y-4">
              <ProductTable items={pageItems} />

              <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing{" "}
                  <b>{frequentAll.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}</b>
                  {"–"}
                  <b>{Math.min(page * PAGE_SIZE, frequentAll.length)}</b> of{" "}
                  <b>{frequentAll.length}</b>
                </div>

                <Pagination page={page} pageCount={pageCount} onChange={setPage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
