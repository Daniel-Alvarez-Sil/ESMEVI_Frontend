"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { fetchContaminacionAcusticaData } from "@/utils/apiUtils";
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

const chartConfig = {
  acousticContamination: {
    label: "Contaminación Acústica",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ContAcustChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchContaminacionAcusticaData();
        // Transform the API data to match the chart format
        const transformedData = response.map((item: any) => ({
          timestamp: item.fechahora,
          value: parseFloat(item.valor),
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contaminación Acústica</CardTitle>
        <CardDescription>
          Niveles registrados a lo largo del tiempo.
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
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(11, 16)} // Show only time
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillAcousticContamination" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-acousticContamination)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-acousticContamination)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillAcousticContamination)"
              fillOpacity={0.4}
              stroke="var(--color-acousticContamination)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending data <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Based on recent measurements
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
