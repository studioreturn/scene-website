"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export default function BristolMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !TOKEN || mapRef.current) return;

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-2.587, 51.454],
      zoom: 13,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
    });

    map.on("load", () => {
      map.getStyle().layers.forEach((layer) => {
        if (layer.type === "symbol") {
          // Remove all labels / icons
          map.removeLayer(layer.id);
        } else if (layer.type === "background") {
          // Make the base background pure black to match the site
          map.setPaintProperty(layer.id, "background-color", "#000000");
        } else if (layer.type === "fill" && !layer.id.includes("water")) {
          // Make all non-water land fills pure black
          map.setPaintProperty(layer.id, "fill-color", "#000000");
        }
      });
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
