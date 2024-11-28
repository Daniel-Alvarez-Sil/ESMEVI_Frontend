"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchActualData } from "@/utils/apiUtils";
import GraphAlert from "./GraphAlert";

const API_CONFIG = [
  {
    url: "http://192.168.0.126/apis/temperatura/getActual.php",
    label: "Temperatura",
    unit: "°C",
    color: "#a8dadc",
    min: 0,
    max: 50,
    greenRange: [15, 26], // Tuple of two numbers
    yellowRange: [
      [5, 14], // First yellow range
      [27, 31], // Second yellow range
    ],
    redRange: [
      [0, 4], // First red range
      [32, 50], // Second red range
    ],
  },
  {
    url: "http://192.168.0.126/apis/humedad/getActual.php",
    label: "Humedad",
    unit: "%",
    color: "#add8e6",
    min: 0,
    max: 100,
    greenRange: [30, 60], // Tuple of two numbers
    yellowRange: [
      [20, 29],
      [61, 70],
    ],
    redRange: [
      [0, 19],
      [71, 100],
    ],
  },
  {
    url: "http://192.168.0.126/apis/calidad_de_aire/getActual.php",
    label: "Calidad del Aire",
    unit: "ppm",
    color: "#8fbdd3", // Example color for Calidad del Aire
  },
  {
    url: "http://192.168.0.126/apis/dioxido_de_carbono/getActual.php",
    label: "Dióxido de Carbono",
    unit: "ppm",
    color: "#457b9d", // Example color for Dióxido de Carbono
  },
  {
    url: "http://192.168.0.126/apis/contaminacion_acustica/getActual.php",
    label: "Contaminación Acústica",
    unit: "dB",
    color: "#1d3557", // Example color for Contaminación Acústica
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
              stroke={api.color}
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
            <GraphAlert
              value={data[api.label] ? parseFloat(data[api.label]!) : 0}
              min={api.min ?? 0} // Provide default fallback of 0
              max={api.max ?? 100} // Provide default fallback of 100
              greenRange={api.greenRange as [number, number]}
              yellowRange={api.yellowRange as [[number, number], [number, number]]}
              redRange={api.redRange as [[number, number], [number, number]]}
            />
            <p className="text-xs text-muted-foreground">Medición en Tiempo Real</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActualDataCards;
