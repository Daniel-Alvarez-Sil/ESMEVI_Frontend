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
  temperatura: number; // Temperatura value
};

const chartConfig = {
  temperatura: {
    label: "Contaminación Acústica (PPM)",
    color: "#1d3557",
  },
} satisfies ChartConfig;

const TemChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    // Fetch data from the Temperatura API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.126/apis/contaminacion_acustica/getAll.php"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await response.json();

        // Map data to match chartData format
        const formattedData: ChartData[] = data.map((item: any) => ({
          date: new Date(item.fechahora).toISOString(), // Convert to ISO date
          temperatura: parseFloat(item.valor),
        }));

        setChartData(formattedData);
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
            <CardTitle>Valores de Contaminación Acústica</CardTitle>
            <CardDescription>
              Visualización de los valores de contaminación acústica registrados.
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
                <linearGradient id="fillTemperatura" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#1d3557"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#1d3557"
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
                dataKey="temperatura"
                type="natural"
                fill="url(#fillTemperatura)"
                stroke="#1d3557"
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
export default TemChart;
