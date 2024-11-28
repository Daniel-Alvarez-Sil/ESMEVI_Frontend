"use client";

import React, { useEffect, useState } from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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
import { fetchAllData, ApiAllResponse } from "@/utils/apiUtils";

// Chart color for Calidad de Aire
const chartColor = "#8fbdd3";

// API URL for Calidad de Aire
const calidadDeAireApi = {
  url: "http://192.168.0.126/apis/calidad_de_aire/getDayAll.php",
  label: "Calidad de Aire",
};

const CalidadDeAireGraph: React.FC = () => {
  const [calidadDeAireData, setCalidadDeAireData] = useState<ApiAllResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllData(calidadDeAireApi.url);
      setCalidadDeAireData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="pt-2 pb-2 grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card>
        <CardHeader>
            <CardTitle>Gráfico de Líneas | Calidad de Aire</CardTitle>
            {/* <CardDescription>
            Visualización de los valores de temperatura registrados por el módulo ESMEVI.
            </CardDescription> */}
        </CardHeader>
        <CardContent>
            <ChartContainer
            config={{
                [calidadDeAireApi.label]: {
                label: calidadDeAireApi.label,
                color: chartColor,
                },
            }}
            >
            <LineChart
                data={calidadDeAireData.map((item) => ({
                date: new Date(item.fechahora).toISOString(), // Retain full ISO string
                valor: parseFloat(item.valor.toString()).toFixed(2),
                }))}
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
                <Line
                dataKey="valor"
                type="natural"
                stroke={chartColor}
                strokeWidth={2}
                dot={{
                    fill: chartColor,
                }}
                activeDot={{
                    r: 6,
                }}
                >
                <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                />
                </Line>
            </LineChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
            Datos por día <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
            Visualizando los datos a través del tiempo para {calidadDeAireApi.label}
            </div>
        </CardFooter>
        </Card>
    </div>
  );
};

export default CalidadDeAireGraph;
