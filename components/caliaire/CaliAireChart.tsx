"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { fetchCalidadDeAireData, fetchDioxidoDeCarbonoData } from "@/utils/apiUtils";
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
  calidadDeAire: {
    label: "Calidad de Aire",
    color: "hsl(var(--chart-1))",
  },
  dioxidoDeCarbono: {
    label: "Dióxido de Carbono",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CaliAireChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const calidadDeAire = await fetchCalidadDeAireData();
        const dioxidoDeCarbono = await fetchDioxidoDeCarbonoData();

        // Transform data to match the chart format
        const transformedData = calidadDeAire.map((item: any, index: number) => ({
          timestamp: item.fechahora,
          calidadDeAire: parseFloat(item.valor),
          dioxidoDeCarbono: parseFloat(dioxidoDeCarbono[index]?.valor || 0),
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
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Displaying Calidad de Aire and CO₂ levels
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
              tickFormatter={(value) => value.slice(11, 16)} // Display time from timestamp
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillCalidadDeAire" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-calidadDeAire)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-calidadDeAire)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDioxidoDeCarbono" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-dioxidoDeCarbono)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-dioxidoDeCarbono)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="calidadDeAire"
              type="natural"
              fill="url(#fillCalidadDeAire)"
              fillOpacity={0.4}
              stroke="var(--color-calidadDeAire)"
              stackId="a"
            />
            <Area
              dataKey="dioxidoDeCarbono"
              type="natural"
              fill="url(#fillDioxidoDeCarbono)"
              fillOpacity={0.4}
              stroke="var(--color-dioxidoDeCarbono)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last updated data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
