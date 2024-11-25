"use client";

import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Fetch utility function
import { fetchAllData, ApiAllResponse } from "@/utils/apiUtils";

// Chart configuration
const chartConfig = {
  temperatura: {
    label: "Temperatura (°C)  ",
    color: "#a8dadc",
  },
} satisfies ChartConfig;

const TemperaturaGraph: React.FC = () => {
  const [chartData, setChartData] = useState<{ date: string; temperatura: number }[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchTemperaturaData = async () => {
      try {
        const data: ApiAllResponse[] = await fetchAllData(
          "http://192.168.0.126/apis/temperatura/getAll.php"
        );
        const formattedData = data.map((item) => ({
          date: new Date(item.fechahora).toISOString().split("T")[0], // Format date
          temperatura: item.valor, // Parse and fix to 2 decimals
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching temperatura data:", error);
      }
    };

    fetchTemperaturaData();
  }, []);

  return (
    // <div className="pt-2 pb-2 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <Card>
        <CardHeader>
            <CardTitle>Área de Temperatura</CardTitle>
            <CardDescription>
            Visualización de los registros de temperatura.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
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
                tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    })
                }
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                dataKey="temperatura"
                type="linear"
                fill="var(--color-temperatura)"
                fillOpacity={0.4}
                stroke="var(--color-temperatura)"
                />
            </AreaChart>
            </ChartContainer>
        </CardContent>
        <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                Información en Tiempo Real <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Registros recientes de temperatura
                </div>
            </div>
            </div>
        </CardFooter>
        </Card>
    // </div>
  );
};

export default TemperaturaGraph;
