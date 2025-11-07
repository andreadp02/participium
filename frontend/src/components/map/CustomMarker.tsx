import { useMemo, useRef, useState } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import type { Marker as LeafMarker } from "leaflet";
import ReportForm from "src/components/report/ReportFrom";

function CustomMarker({
  draggable = false,
  location = false,
}: {
  draggable?: boolean;
  location?: boolean;
}) {
  const map = useMap();
  const [showMarker, setShowMarker] = useState(false);
  const [position, setPosition] = useState(() =>
    showMarker ? map.getCenter() : null,
  );
  const [showReport, setShowReport] = useState(false);

  const handleLocate = () => {
    map.locate();
  };
  const mapEvents = useMapEvents({
    locationfound(e) {
      if (showReport) return;
      setPosition(e.latlng);
      const zoomLevel = 16; // mapEvents.getZoom();
      mapEvents.setView(e.latlng, zoomLevel, { animate: true });
    },
    move() {
      if (showReport) return;
      if (!showMarker) return;
      setPosition(mapEvents.getCenter());
    },
    click(e) {
      if (showReport) return;
      setShowMarker(true);
      setPosition(e.latlng);
    },
  });

  const markerRef = useRef<LeafMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        if (!draggable) return;
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [draggable],
  );

  const openReport = () => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    setShowReport(true);
  };

  const closeReport = () => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    setShowReport(false);
  };

  return (
    <>
      {location && (
        <div className="leaflet-top leaflet-right m-4">
          <div className="z-40 pointer-events-auto">
            <button
              type="button"
              onClick={handleLocate}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow hover:bg-slate-50 transition"
            >
              Locate me
            </button>
          </div>
        </div>
      )}

      {position && (
        <Marker
          draggable={draggable}
          eventHandlers={draggable ? eventHandlers : undefined}
          position={position}
          ref={markerRef}
        >
          <Popup>
            {/* open the overlay form when pressed */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={openReport}
                className="w-full rounded-md bg-indigo-600 text-white px-3 py-1 text-sm hover:bg-indigo-700 transition"
              >
                Add Report
              </button>
            </div>
          </Popup>
          {showReport && (
            <ReportForm
              lat={position.lat}
              lng={position.lng}
              onClose={closeReport}
            />
          )}
          {/* {children} */}
        </Marker>
      )}
    </>
  );
}

export default CustomMarker;
