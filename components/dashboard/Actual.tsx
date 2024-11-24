"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchActualData } from "@/utils/apiUtils";

const API_CONFIG = [
  {
    url: "http://192.168.0.126/apis/temperatura/getActual.php",
    label: "Temperatura",
    unit: "°C",
  },
  {
    url: "http://192.168.0.126/apis/humedad/getActual.php",
    label: "Humedad",
    unit: "%",
  },
  {
    url: "http://192.168.0.126/apis/calidad_de_aire/getActual.php",
    label: "Calidad del Aire",
    unit: "ppm",
  },
  {
    url: "http://192.168.0.126/apis/dioxido_de_carbono/getActual.php",
    label: "Dióxido de Carbono",
    unit: "ppm",
  },
  {
    url: "http://192.168.0.126/apis/contaminacion_acustica/getActual.php",
    label: "Contaminación Acústica",
    unit: "dB",
  },
];

const ActualDataCards: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const fetchAllData = async () => {
      const results: { [key: string]: string | null } = {};
      for (const api of API_CONFIG) {
        const value = await fetchActualData(api.url);
        results[api.label] = value;
      }
      setData(results);
    };

    fetchAllData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {API_CONFIG.map((api) => (
        <Card key={api.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{api.label}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8fbdd3"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-radio"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data[api.label] !== null ? `${data[api.label]} ${api.unit}` : "Loading..."}
            </div>
            <p className="text-xs text-muted-foreground">Medición en Tiempo Real</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActualDataCards;
