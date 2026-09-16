import { useEffect, useRef } from "react";
import {
  Map,
  NavigationControl,
  setWorkerUrl,
} from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.css";

setWorkerUrl(workerUrl);

function MapView() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    console.log("MapTiler Key:", apiKey ? "Loaded" : "Missing");

    const map = new Map({
      container: mapContainer.current,

      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,

      center: [78.9629, 22.5937],
      zoom: 4.5,
    });

    map.addControl(
      new NavigationControl(),
      "top-right"
    );

    map.on("load", () => {
      console.log("MAP LOADED SUCCESSFULLY");
    });

    map.on("error", (e) => {
      console.log("MAP ERROR:", e);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} className="map-container" />;
}

export default MapView;