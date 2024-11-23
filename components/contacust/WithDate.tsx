// "use client"

// import React, { useEffect, useState } from "react";
// import { CalendarDateRangePicker } from "@/components/date-range-picker";
// import { fetchStatsWithDateRange, StatsResponse } from "@/utils/apiUtils";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";


// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { fetchFilteredData, ApiResponse } from "@/utils/apiUtils";

// // Define the configuration for the chart
// const chartConfig = {
//   temperatura: {
//     label: "Temperatura (°C)",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;


// import TemHumeSensor from "@/components/temhume/Sensor";
// import TemHumeChartDate from "@/components/temhume/TemHumeChartDate";
// import TemChartDate from "./TemChartDate";

// const TemHumeWithDate: React.FC = () => {
//   const [fechaInicio, setFechaInicio] = useState<string | null>(null);
//   const [fechaFin, setFechaFin] = useState<string | null>(null);
//   const [statsTemperatura, setStatsTemperatura] = useState<StatsResponse | null>(null);
//   const [statsHumedad, setStatsHumedad] = useState<StatsResponse | null>(null);

//   // Fetch stats when the date range changes
//   useEffect(() => {
//     if (fechaInicio && fechaFin) {
//       fetchStatsWithDateRange(
//         "http://192.168.0.126/apis/temperatura/getFilteredStats.php",
//         fechaInicio,
//         fechaFin
//       ).then((data: StatsResponse | null) => setStatsTemperatura(data));

//       fetchStatsWithDateRange(
//         "http://192.168.0.126/apis/humedad/getFilteredStats.php",
//         fechaInicio,
//         fechaFin
//       ).then((data: StatsResponse | null) => setStatsHumedad(data));
//     }
//   }, [fechaInicio, fechaFin]);

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4">
//       <CalendarDateRangePicker
//         onChange={(range) => {
//           const { startDate, endDate } = range;
//           setFechaInicio(startDate.toISOString().split("T")[0]);
//           setFechaFin(endDate.toISOString().split("T")[0]);
//         }}
//       />
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {/* <TempActual /> */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Promedio</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {statsTemperatura && statsHumedad
//                 ? `${statsTemperatura.avg} | ${statsHumedad.avg}`
//                 : "Loading..."}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Temperatura en °C | Humedad en %
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Máximo</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {statsTemperatura && statsHumedad
//                 ? `${statsTemperatura.max} | ${statsHumedad.max}`
//                 : "Loading..."}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Temperatura en °C | Humedad en %
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Mínimo</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {statsTemperatura && statsHumedad
//                 ? `${statsTemperatura.min} | ${statsHumedad.min}`
//                 : "Loading..."}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Temperatura en °C | Humedad en %
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
//         {/* <TemHumeChartDate/> */}
//         <Card>
//       <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
//         <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
//           <CardTitle>Gráfico de Temperatura</CardTitle>
//           <CardDescription>Mostrando registros de temperatura en °C.</CardDescription>
//         </div>
//       </CardHeader>
//       <CardContent className="px-2 sm:p-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[250px] w-full"
//         >
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 });
//               }}
//             />
//             <ChartTooltip
//               content={
//                 <ChartTooltipContent
//                   className="w-[150px]"
//                   nameKey="temperatura"
//                   labelFormatter={(value) => {
//                     return new Date(value).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                     });
//                   }}
//                 />
//               }
//             />
//             <Bar dataKey="temperatura" fill="hsl(var(--chart-1))" />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//         {/* <TemChartDate/> */}
//         <TemHumeSensor />
//       </div>
//     </div>
//   );
// };

// export default TemHumeWithDate;

"use client";

import React, { useEffect, useState } from "react";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { fetchStatsWithDateRange, fetchFilteredData, ApiResponse, StatsResponse } from "@/utils/apiUtils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration for temperature
const chartConfig = {
  temperatura: {
    label: "Temperatura (°C)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const TemHumeWithDate: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState<string | null>(null);
  const [fechaFin, setFechaFin] = useState<string | null>(null);
  const [statsTemperatura, setStatsTemperatura] = useState<StatsResponse | null>(null);
  const [statsHumedad, setStatsHumedad] = useState<StatsResponse | null>(null);
  const [chartData, setChartData] = useState<{ date: string; temperatura: number }[]>([]);

  // Fetch stats when the date range changes
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      // Fetch stats for temperature and humidity
      fetchStatsWithDateRange(
        "http://192.168.0.126/apis/temperatura/getFilteredStats.php",
        fechaInicio,
        fechaFin
      ).then((data) => setStatsTemperatura(data));

      fetchStatsWithDateRange(
        "http://192.168.0.126/apis/humedad/getFilteredStats.php",
        fechaInicio,
        fechaFin
      ).then((data) => setStatsHumedad(data));

      // Fetch chart data for temperature
      fetchFilteredData(
        "http://192.168.0.126/apis/temperatura/getFilteredAll.php",
        fechaInicio,
        fechaFin
      ).then((data: ApiResponse[]) => {
        const formattedData = data.map((item) => ({
          date: new Date(item.fechahora).toISOString().split("T")[0],
          temperatura: parseFloat(item.valor),
        }));
        setChartData(formattedData);
      });
    }
  }, [fechaInicio, fechaFin]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Date Range Picker */}
      <CalendarDateRangePicker
        onChange={(range) => {
          const { startDate, endDate } = range;
          setFechaInicio(startDate.toISOString().split("T")[0]);
          setFechaFin(endDate.toISOString().split("T")[0]);
        }}
      />

      {/* Stats Display */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsTemperatura ? statsTemperatura.avg : "Loading..."} |{" "}
              {statsHumedad ? statsHumedad.avg : "Loading..."}
            </div>
            <p className="text-xs text-muted-foreground">
              Temperatura en °C | Humedad en %
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Máximo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsTemperatura ? statsTemperatura.max : "Loading..."} |{" "}
              {statsHumedad ? statsHumedad.max : "Loading..."}
            </div>
            <p className="text-xs text-muted-foreground">
              Temperatura en °C | Humedad en %
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mínimo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsTemperatura ? statsTemperatura.min : "Loading..."} |{" "}
              {statsHumedad ? statsHumedad.min : "Loading..."}
            </div>
            <p className="text-xs text-muted-foreground">
              Temperatura en °C | Humedad en %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Display */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Gráfico de Temperatura</CardTitle>
              <CardDescription>
                Mostrando registros de temperatura en °C.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
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
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="temperatura"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar dataKey="temperatura" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemHumeWithDate;
