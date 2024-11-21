"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchActualData } from "@/utils/apiUtils";

const TemHumeActual: React.FC = () => {
  const [actualTemperatura, setActualTemperatura] = useState<string>("Loading...");
  const [actualHumedad, setActualHumedad] = useState<string>("Loading...");

  useEffect(() => {
    // Fetch actual data for temperatura
    fetchActualData("http://192.168.0.126/apis/temperatura/getActual.php").then(
      (data) => setActualTemperatura(data ?? "No data")
    );

    // Fetch actual data for humedad
    fetchActualData("http://192.168.0.126/apis/humedad/getActual.php").then(
      (data) => setActualHumedad(data ?? "No data")
    );
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Actual</CardTitle>
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
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {actualTemperatura} | {actualHumedad}
        </div>
        <p className="text-xs text-muted-foreground">
          Temperatura en °C | Humedad en %
        </p>
      </CardContent>
    </Card>
  );
};

export default TemHumeActual;
