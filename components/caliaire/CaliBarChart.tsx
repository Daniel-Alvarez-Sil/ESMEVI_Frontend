"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchAllData, ApiAllResponse } from "@/utils/apiUtils";

// Chart color for Calidad de Aire
const chartColor = "#8fbdd3";

// API URL for Calidad de Aire
const calidadDeAireApi = {
  url: "http://192.168.0.126/apis/calidad_de_aire/getDayAll.php",
  label: "Calidad de Aire",
};

const CalidadDeAireGraphComponent: React.FC = () => {
  const [calidadDeAireData, setTemperaturaData] = useState<ApiAllResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllData(calidadDeAireApi.url);
      setTemperaturaData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="pt-2 pb-2 grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Gráfico de Barras | Calidad de Aire</CardTitle>
            <CardDescription>
                Visualización de los valores de calidad de aire registrados por el módulo ESMEVI.
            </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <ChartContainer
            config={{
                views: { label: "Values" },
                valor: {
                label: "Calidad de Aire",
                color: chartColor,
                },
            }} // Provide the required config prop
            className="aspect-auto h-[250px] w-full"
            >
            <BarChart
                data={calidadDeAireData.map((item) => ({
                date: new Date(item.fechahora).toISOString(),
                valor: item.valor,
                }))}
                margin={{
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    })
                }
                />
                <ChartTooltip
                content={
                    <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="valor"
                    labelFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        })
                    }
                    />
                }
                />
                <Bar dataKey="valor" fill={chartColor} barSize={20} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    </div>
  );
};

export default CalidadDeAireGraphComponent;
