"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchSensors } from "@/utils/apiUtils";

const TemHumeSensor: React.FC = () => {
  const [sensors, setSensors] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetSensors = async () => {
      const sensorData = await fetchSensors(
        "http://192.168.0.126/apis/temperatura/getSensores.php"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground pb-2">
            Componentes utilizados para medir.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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

export default TemHumeSensor;
