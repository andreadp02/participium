import React, { useEffect, useState } from "react";
import { Container } from "src/components/shared/Container";
import { SectionTitle } from "src/components/shared/SectionTitle";
import MapView from "src/components/map/MapView";
// import { getReports } from "src/services/api";
import { Report, ReportStatus } from "src/services/models";

const MapPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        // const data = await getReports();
        // setReports(data ?? []);

        // sample markers in Torino if backend doesn't provide coordinates
        setReports([
          new Report(45.07, 7.68, "pothole", ReportStatus.PENDING, 1),
          new Report(45.07, 7.69, "broken light", ReportStatus.ASSIGNED, 2),
          new Report(45.07, 7.7, "missing", ReportStatus.IN_PROGRESS, 3),
          new Report(45.07, 7.71, "dumping", ReportStatus.SUSPENDED, 4),
          new Report(45.07, 7.72, "graffiti", ReportStatus.RESOLVED, 5),
          new Report(45.07, 7.73, "fallen tree", ReportStatus.REJECTED, 6),
        ]);
      } catch (err) {
        console.debug(`Error fetching reports:`, err);
        // fail gracefully
        setError("Could not fetch reports.");
      }
    };
    fetch();
  }, []);

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-slate-50 py-12">
        <Container>
          <SectionTitle
            title="Explore reported issues on the map"
            subtitle="Pan, zoom and click markers to see details. Choose a location to report new issues."
          />
          {error && (
            <div className="mb-4 rounded-md bg-amber-50 border border-amber-200 p-3 text-amber-800 shadow-sm">
              {error}
            </div>
          )}
        </Container>
      </section>

      <section className="h-[75vh]">
        <MapView reports={reports} />
      </section>
    </main>
  );
};

export default MapPage;
