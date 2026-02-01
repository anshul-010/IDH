export function getDatasetUrl(key) {
  // Vite will copy JSON as an asset and give a URL
  if (key === "IMF") {
    return new URL("../data/response2.json", import.meta.url).toString();
  }
  return new URL("../data/response1.json", import.meta.url).toString();
}

export function loadDataset(key) {
  const url = getDatasetUrl(key);

  // Small dataset: direct fetch+json is fine
  if (key !== "IMF") {
    return fetch(url).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
  }

  // Large dataset: worker parsing to avoid UI freeze
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./jsonWorker.js", import.meta.url), { type: "module" });

    worker.onmessage = (e) => {
      if (e.data.type === "ok") {
        resolve(e.data.json);
        worker.terminate();
      } else {
        reject(new Error(e.data.message));
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      reject(err);
      worker.terminate();
    };

    worker.postMessage({ url });
  });
}
