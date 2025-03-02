// Es el bueno
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

// Define the type for chart data
type ChartData = {
  date: string; // Date in ISO format
  desktop: number; // Dióxido de Carbono value
  mobile: number; // Calidad de Aire value
};

const chartConfig = {
  visitors: {
    label: "Valor",
  },
  desktop: {
    label: "Calidad del Aire (PPM)",
    color: "#8fbdd3",
  },
  mobile: {
    label: "Dióxido de Carbono (PPM)", 
    color: "#457b9d",
  },
} satisfies ChartConfig;

// Define the component
const TemHumeChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    // Fetch data from both APIs
    const fetchData = async () => {
      try {
        const dioxido_de_carbonoResponse = await fetch(
          "http://192.168.0.126/apis/dioxido_de_carbono/getAll.php"
        );
        const calidad_de_aireResponse = await fetch(
          "http://192.168.0.126/apis/calidad_de_aire/getAll.php"
        );

        if (!dioxido_de_carbonoResponse.ok || !calidad_de_aireResponse.ok) {
          throw new Error("Failed to fetch data from APIs");
        }

        const dioxido_de_carbonoData = await dioxido_de_carbonoResponse.json();
        const calidad_de_aireData = await calidad_de_aireResponse.json();

        // Map data to match chartData format
        const combinedData: ChartData[] = dioxido_de_carbonoData.map(
          (tempItem: any, index: number) => {
            const calidad_de_aireItem = calidad_de_aireData[index] || {};
            return {
              date: new Date(tempItem.fechahora)
                .toISOString(), // Convert to ISO date
              mobile: parseFloat(tempItem.valor),
              desktop: parseFloat(calidad_de_aireItem.valor) || 0,
            };
          }
        );

        setChartData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date); // Use the explicitly typed date property
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="pt-2 pb-2 grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Valores de Dióxido de Carbono y Calidad de Aire</CardTitle>
            <CardDescription>
              Valores conjuntos, escalados para evitar solapaiento. 
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
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
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
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
    </div>
  );
};

// Export the component
export default TemHumeChart;
