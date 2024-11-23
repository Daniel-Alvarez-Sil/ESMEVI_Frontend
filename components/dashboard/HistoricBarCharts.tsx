"use client";

import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchAllData, ApiAllResponse } from "@/utils/apiUtils";

// Chart configuration with custom colors
const chartColors: { [key: string]: string } = {
  Temperatura: "black",
  Humedad: "green",
  "Calidad del Aire": "navy",
  "Dióxido de Carbono": "orange",
  "Contaminación Acústica": "purple",
};

const apiUrls = [
  {
    url: "http://192.168.0.126/apis/temperatura/getAll.php",
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

const GraphComponent: React.FC = () => {
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
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gráficos de Barras</CardTitle>
          <CardDescription>Visualización de los 5 parámetros medidos a través del módulos ESMEVI. </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 pt-2 ">
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1"> */}
            {Object.entries(allData).map(([label, data]) => (
            <Card key={label} className="w-full">
                <CardHeader>
                <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent>
                <ChartContainer
                    config={{
                    views: { label: "Values" },
                    valor: {
                        label: label,
                        color: chartColors[label],
                    },
                    }} // Provide the required config prop
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                    data={data.map((item) => ({
                        date: new Date(item.fechahora).toISOString().split("T")[0],
                        valor: item.valor,
                    }))}
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
                        minTickGap={32}
                        tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                        }
                    />
                    <ChartTooltip
                        content={
                        <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="valor"
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
                    <Bar
                        dataKey="valor"
                        fill={chartColors[label]}
                        barSize={20}
                    />
                    </BarChart>
                </ChartContainer>
                </CardContent>
            </Card>
            ))}
         {/* </div> */}
        </CardContent>
    </Card>
  );
};

export default GraphComponent;
