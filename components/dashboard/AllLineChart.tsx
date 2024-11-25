"use client";

import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

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

// Define API URLs with labels and colors
const apiUrls = [
  {
    url: "http://192.168.0.126/apis/temperatura/getAll.php",
    label: "Temperatura",
    color: "#a8dadc",
  },
  {
    url: "http://192.168.0.126/apis/humedad/getAll.php",
    label: "Humedad",
    color: "#add8e6",
  },
  {
    url: "http://192.168.0.126/apis/calidad_de_aire/getAll.php",
    label: "Calidad del Aire",
    color: "#8fbdd3",
  },
  {
    url: "http://192.168.0.126/apis/dioxido_de_carbono/getAll.php",
    label: "Dióxido de Carbono",
    color: "#457b9d",
  },
  {
    url: "http://192.168.0.126/apis/contaminacion_acustica/getAll.php",
    label: "Contaminación Acústica",
    color: "#1d3557",
  },
];

// Define the type for the chart data
type ChartDataPoint = {
  date: string; // Date as a string
  [key: string]: number | string; // Dynamically allow other numeric keys
};

// Define the chart configuration
const chartConfig: ChartConfig = apiUrls.reduce((config, { label, color }) => {
  config[label] = { label, color };
  return config;
}, {} as ChartConfig);

const MultiLineChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const combinedData: ChartDataPoint[] = [];

      for (const { url, label } of apiUrls) {
        try {
          const response = await fetch(url);
          const data = await response.json();

          // Map API data to chart-compatible format
          const formattedData = data.map((item: any) => ({
            date: new Date(item.fechahora).toISOString(), // Format date
            [label]: parseFloat(item.valor),
          }));

          // Merge data by date
          formattedData.forEach((entry: ChartDataPoint) => {
            const existing = combinedData.find((d) => d.date === entry.date);
            if (existing) {
              existing[label] = entry[label];
            } else {
              combinedData.push(entry);
            }
          });
        } catch (error) {
          console.error(`Error fetching data for ${label}:`, error);
        }
      }

      // Sort combined data by date
      combinedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setChartData(combinedData);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Líneas - Múltiples Parámetros</CardTitle>
        <CardDescription>
          Visualización de múltiples parámetros en un gráfico.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
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
            //   interval={0} // Ensure all data points have a tick
              interval="preserveStartEnd" // Show only unique dates
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={["auto", "auto"]} // Adjust the range automatically
            />
            <ChartTooltip
              cursor={{ stroke: "#ccc", strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  indicator="line"
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
            {apiUrls.map(({ label, color }) => (
              <Line
                key={label}
                dataKey={label}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4, fill: color }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Datos de múltiples parámetros <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Basado en los registros más recientes
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultiLineChartComponent;
