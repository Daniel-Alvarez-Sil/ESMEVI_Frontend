"use client";

import React, { useEffect, useState } from "react";
import { LabelList, Pie, PieChart } from "recharts";
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

// Define the type for API response
type ApiResponse = {
  rounded_value: string;
  count: number;
};

// Define the type for the chart data
type ChartDataPoint = {
  rounded_value: string;
  proportion: number;
  fill: string;
};

const PieChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const colors = [
    "#a8dadc", // Color for each segment, can extend for more values
    "#add8e6",
    "#8fbdd3",
    "#457b9d",
    "#1d3557",
    "#f4a261",
    "#e76f51",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.126/apis/temperatura/getCountValor.php");
        const data: ApiResponse[] = await response.json();

        // Calculate total count for proportions
        const total = data.reduce((sum, item) => sum + item.count, 0);

        // Map API data to chart-compatible format
        const formattedData = data.map((item, index) => ({
          rounded_value: item.rounded_value,
          proportion: (item.count / total) * 100, // Convert count to percentage
          fill: colors[index % colors.length], // Cycle through colors
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de Temperatura</CardTitle>
        <CardDescription>Proporciones de valores redondeados</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            visitors: {
              label: "Proporción",
            },
          }}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="proportion" />}
            />
            <Pie data={chartData} dataKey="proportion" nameKey="rounded_value">
              <LabelList
                dataKey="rounded_value"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Proporciones calculadas <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Basado en los datos redondeados de temperatura
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
