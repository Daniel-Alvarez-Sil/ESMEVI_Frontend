"use client";
import { Radio } from "lucide-react"
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchActualData } from "@/utils/apiUtils";

const TemHumeActual: React.FC = () => {
  const [actualTemperatura, setActualCalidadDeAire] = useState<string>("Loading...");
  const [actualHumedad, setActualCO2] = useState<string>("Loading...");

  useEffect(() => {
    // Fetch actual data for temperatura
    fetchActualData("http://192.168.0.126/apis/calidad_de_aire/getActual.php").then(
      (data) => setActualCalidadDeAire(data ?? "No data")
    );

    // Fetch actual data for humedad
    fetchActualData("http://192.168.0.126/apis/dioxido_de_carbono/getActual.php").then(
      (data) => setActualCO2(data ?? "No data")
    );
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Actual</CardTitle>
        {/* <Radio /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#457b9d" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-radio"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>
        {/* <svg
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
        </svg> */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {actualTemperatura} | {actualHumedad}
        </div>
        <p className="text-xs text-muted-foreground">
          Calidad de aire en PPM | CO2 en PPM
        </p>
      </CardContent>
    </Card>
  );
};

export default TemHumeActual;
