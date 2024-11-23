"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchStats, StatsResponse } from "@/utils/apiUtils";
import TemHumeActual from "@/components/temhume/Actual";

const TemHumeStats: React.FC = () => {
  const [statsTemperatura, setStatsTemperatura] = useState<StatsResponse | null>(null);
  const [statsHumedad, setStatsHumedad] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchAllStats = async () => {
      const temperaturaStats = await fetchStats(
        "http://192.168.0.126/apis/temperatura/getStats.php"
      );
      const humedadStats = await fetchStats(
        "http://192.168.0.126/apis/humedad/getStats.php"
      );

      setStatsTemperatura(temperaturaStats);
      setStatsHumedad(humedadStats);
    };

    fetchAllStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TemHumeActual />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Promedio</CardTitle>
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
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statsTemperatura && statsHumedad
              ? `${statsTemperatura.avg} | ${statsHumedad.avg}`
              : "Loading..."}
          </div>
          <p className="text-xs text-muted-foreground">
            Temperatura en °C | Humedad en %
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Máximo</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dd1313" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statsTemperatura && statsHumedad
              ? `${statsTemperatura.max} | ${statsHumedad.max}`
              : "Loading..."}
          </div>
          <p className="text-xs text-muted-foreground">
            Temperatura en °C | Humedad en %
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mínimo</CardTitle>
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
            {statsTemperatura && statsHumedad
              ? `${statsTemperatura.min} | ${statsHumedad.min}`
              : "Loading..."}
          </div>
          <p className="text-xs text-muted-foreground">
            Temperatura en °C | Humedad en %
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemHumeStats;
