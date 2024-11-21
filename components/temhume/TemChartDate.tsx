// "use client";

// import React, { useEffect, useState } from "react";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   // CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
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

// // Define the component
// const TempBarChart: React.FC = () => {
//   const [chartData, setChartData] = useState<{ date: string; temperatura: number }[]>([]);
//   const [fechaInicio, setFechaInicio] = useState<string | null>(null);
//   const [fechaFin, setFechaFin] = useState<string | null>(null);

//   // Fetch data for "temperatura"
//   const fetchChartData = async () => {
//     // const fechaInicio = "2024-01-01"; // Replace with dynamic date selection
//     // const fechaFin = "2024-12-31"; // Replace with dynamic date selection
//     try {
//       const temperaturaData = await fetchFilteredData(
//         "http://192.168.0.126/apis/temperatura/getFilteredAll.php",
//         fechaInicio,
//         fechaFin
//       );

//       const formattedData = temperaturaData.map((item: ApiResponse) => ({
//         date: new Date(item.fechahora).toISOString().split("T")[0],
//         temperatura: parseFloat(item.valor),
//       }));

//       setChartData(formattedData);
//     } catch (error) {
//       console.error("Error fetching chart data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   return (
//     <Card>
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
//   );
// };

// export default TempBarChart;
