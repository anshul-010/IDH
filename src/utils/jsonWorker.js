self.onmessage = async (e) => {
  const { url } = e.data;

  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();       // keep main thread free
    const json = JSON.parse(text);       // parse in worker
    self.postMessage({ type: "ok", json });
  } catch (err) {
    self.postMessage({ type: "err", message: err?.message || "Worker load failed" });
  }
};
