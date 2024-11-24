"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchSensors } from "@/utils/apiUtils";

const ContAcustSensor: React.FC = () => {
  const [sensors, setSensors] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetSensors = async () => {
      const sensorData = await fetchSensors(
        "http://192.168.0.126/apis/contaminacion_acustica/getSensores.php"
      );
      setSensors(sensorData);
    };

    fetchAndSetSensors();
  }, []);

  return (
    <div className="pt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sensores</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dd1313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground pb-2">
            Componentes utilizados para medir.
          </p>
          <div className={`grid gap-4 ${sensors.length === 1 ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-2"}`}>
            {sensors.length > 0 ? (
              sensors.map((sensor, index) => (
                <Card key={index}>
                  <CardContent>
                    <div className="pt-3 text-2xl font-bold text-center">
                      {sensor}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-xs text-muted-foreground mt-4">
                No sensors found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContAcustSensor;
