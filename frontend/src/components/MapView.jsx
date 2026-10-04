import { useEffect, useRef } from "react";

import useWaterBodies from "../services/useWaterBodies";

import {
  Map,
  NavigationControl,
  Marker,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";
import "./MapView.css";

setWorkerUrl(workerUrl);

function MapView({ selectedWaterBody = null }) {
  const mapContainer = useRef(null);
  const { waterBodies } = useWaterBodies();
  const COLORS = { Good: "#12a06b", Moderate: "#c98a14", Poor: "#d2503a" };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    console.log(
      "MapTiler Key:",
      apiKey ? "Loaded" : "Missing"
    );

    const map = new Map({
      container: mapContainer.current,

      style: `https://api.maptiler.com/maps/ocean/style.json?key=${apiKey}`,

      center: selectedWaterBody
        ? [
            selectedWaterBody.longitude,
            selectedWaterBody.latitude,
          ]
        : [78.9629, 22.5937],

      zoom: selectedWaterBody ? 10 : 4.5,
    });

    map.addControl(
      new NavigationControl(),
      "top-right"
    );

    map.on("load", () => {
      console.log("MAP LOADED SUCCESSFULLY");

      if (selectedWaterBody) {
        // Selected water body ka sirf marker
        new Marker({ color: COLORS[selectedWaterBody?.quality] || "#0a7fb5" })
          .setLngLat([
            selectedWaterBody.longitude,
            selectedWaterBody.latitude,
          ])
          .setPopup(
            new Popup().setHTML(`
              <h3>${selectedWaterBody.name}</h3>
              <p>${selectedWaterBody.type}</p>
              <p>${selectedWaterBody.state}</p>
              <strong>Quality: ${selectedWaterBody.quality}</strong>
            `)
          )
          .addTo(map);
      } else {
        // Saare water bodies ke markers
        waterBodies.forEach((waterBody) => {
          new Marker({ color: COLORS[waterBody.quality] })
            .setLngLat([
              waterBody.longitude,
              waterBody.latitude,
            ])
            .setPopup(
              new Popup().setHTML(`
                <h3>${waterBody.name}</h3>
                <p>${waterBody.type}</p>
                <p>${waterBody.state}</p>
                <strong>Quality: ${waterBody.quality}</strong>
              `)
            )
            .addTo(map);
        });
      }
    });

    map.on("error", (e) => {
      console.log("MAP ERROR:", e);
    });

    return () => {
      map.remove();
    };
  }, [selectedWaterBody, waterBodies]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
    />
  );
}

export default MapView;