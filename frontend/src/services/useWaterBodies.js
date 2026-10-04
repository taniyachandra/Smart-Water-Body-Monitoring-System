import { useEffect, useState } from "react";
import { api } from "./api";

let cache = null;

export default function useWaterBodies() {
  const [waterBodies, setWaterBodies] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cache) return;
    api("/water-bodies")
      .then((data) => {
        cache = data;
        setWaterBodies(data);
      })
      .catch(() => setError("Could not load data. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return { waterBodies, loading, error };
}