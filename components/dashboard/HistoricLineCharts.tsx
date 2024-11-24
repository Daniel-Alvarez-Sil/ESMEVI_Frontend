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

// Chart colors for each API
const chartColors: { [key: string]: string } = {
  Temperatura: "black",
  Humedad: "green",
  "Calidad del Aire": "navy",
  "Dióxido de Carbono": "orange",
  "Contaminación Acústica": "purple",
};

// API URLs with labels
const apiUrls = [
  {
    url: "http://192.168.0.126/apis/temperatura/getDayAll.php",
    label: "Temperatura",
  },
  {
    url: "http://192.168.0.126/apis/humedad/getAll.php",
    label: "Humedad",
  },
  {
    url: "http://192.168.0.126/apis/calidad_de_aire/getAll.php",
    label: "Calidad del Aire",
  },
  {
    url: "http://192.168.0.126/apis/dioxido_de_carbono/getAll.php",
    label: "Dióxido de Carbono",
  },
  {
    url: "http://192.168.0.126/apis/contaminacion_acustica/getAll.php",
    label: "Contaminación Acústica",
  },
];

const GraphComponentWithLines: React.FC = () => {
  const [allData, setAllData] = useState<{ [key: string]: ApiAllResponse[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      const results: { [key: string]: ApiAllResponse[] } = {};
      for (const api of apiUrls) {
        const data = await fetchAllData(api.url);
        results[api.label] = data;
      }
      setAllData(results);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráficos de Líneas</CardTitle>
        <CardDescription>
          Visualización de los 5 parámetros medidos a través del módulos ESMEVI.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {Object.entries(allData).map(([label, data]) => (
          <Card key={label} className="w-full">
            <CardHeader>
              <CardTitle>{label}</CardTitle>
              <CardDescription>Fluctuación de {label}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  [label]: {
                    label,
                    color: chartColors[label],
                  },
                }}
              >
                <LineChart
                  data={data.map((item) => ({
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
                    stroke={chartColors[label]}
                    strokeWidth={2}
                    dot={{
                      fill: chartColors[label],
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
                Visualizando los datos a través del tiempo para {label}
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default GraphComponentWithLines;
