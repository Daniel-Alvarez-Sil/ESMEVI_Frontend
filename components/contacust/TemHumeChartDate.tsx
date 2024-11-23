"use client";

import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchFilteredData, ApiResponse } from "@/utils/apiUtils";

type ChartData = {
  date: string; // Date in ISO format
  desktop: number; // Temperatura value
  mobile: number; // Humedad value
};

const chartConfig = {
  visitors: {
    label: "Valor",
  },
  desktop: {
    label: "Temperatura (°C)",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Humedad (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TemHumeChartDate: React.FC = () => {
  const [timeRange, setTimeRange] = useState("90d");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchChartData = async () => {
    const fechaInicio = "2024-01-01"; // Replace with dynamic date selection
    const fechaFin = "2024-12-31"; // Replace with dynamic date selection

    try {
      const temperaturaData = await fetchFilteredData(
        "http://192.168.0.126/apis/temperatura/getFilteredAll.php",
        fechaInicio,
        fechaFin
      );
      const humedadData = await fetchFilteredData(
        "http://192.168.0.126/apis/humedad/getFilteredAll.php",
        fechaInicio,
        fechaFin
      );

      // Combine data from both APIs
      const combinedData: ChartData[] = temperaturaData.map(
        (tempItem: ApiResponse, index: number) => {
          const humedadItem = humedadData[index] || {};
          return {
            date: new Date(tempItem.fechahora).toISOString().split("T")[0],
            desktop: parseFloat(tempItem.valor),
            mobile: parseFloat(humedadItem.valor) || 0,
          };
        }
      );

      setChartData(combinedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    // if (timeRange === "30d") {
    //   daysToSubtract = 30;
    // } else if (timeRange === "7d") {
    //   daysToSubtract = 7;
    // }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Valores de Temperatura y Humedad</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 días
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 días
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TemHumeChartDate;
