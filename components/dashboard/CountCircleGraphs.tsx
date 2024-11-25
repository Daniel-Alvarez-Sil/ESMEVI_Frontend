// "use client";

// import React, { useEffect, useState } from "react";
// import { Pie, PieChart, LabelList } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { fetchCountData, CountDataResponse } from "@/utils/apiUtils";

// // API URLs and metadata
// const apiDetails = [
//   {
//     url: "http://192.168.0.126/apis/temperatura/getCountValor.php",
//     label: "Temperatura",
//     color: "#a8dadc",
//   },
//   {
//     url: "http://192.168.0.126/apis/humedad/getCountValor.php",
//     label: "Humedad",
//     color: "#add8e6",
//   },
//   {
//     url: "http://192.168.0.126/apis/calidad_de_aire/getCountValor.php",
//     label: "Calidad del Aire",
//     color: "#8fbdd3",
//   },
//   {
//     url: "http://192.168.0.126/apis/dioxido_de_carbono/getCountValor.php",
//     label: "Dióxido de Carbono",
//     color: "#457b9d",
//   },
//   {
//     url: "http://192.168.0.126/apis/contaminacion_acustica/getCountValor.php",
//     label: "Contaminación Acústica",
//     color: "#1d3557",
//   },
// ];

// // Define the chart configuration for each API
// const chartConfig = apiDetails.reduce((config, { label, color }) => {
//   config[label] = { label, color };
//   return config;
// }, {} as any);

// const CircleGraphs: React.FC = () => {
//   const [chartData, setChartData] = useState<{
//     [key: string]: CountDataResponse[];
//   }>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const dataMap: { [key: string]: CountDataResponse[] } = {};

//       for (const { url, label } of apiDetails) {
//         const data = await fetchCountData(url);
//         dataMap[label] = data;
//       }

//       setChartData(dataMap);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
//       {apiDetails.map(({ label, color }) => {
//         const data = chartData[label] || [];

//         // Compute the total sum of counts for proportions
//         const totalCount = data.reduce((sum, item) => sum + item.count, 0);

//         // Prepare chart data with proportions and colors
//         const formattedData = data.map((item) => ({
//           name: item.rounded_value,
//           value: (item.count / totalCount) * 100, // Proportional value
//           fill: color,
//         }));

//         return (
//           <Card key={label}>
//             <CardHeader className="items-center pb-0">
//               <CardTitle>{label} - Distribución</CardTitle>
//               <CardDescription>
//                 Distribución proporcional de los valores redondeados.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 pb-0">
//               <ChartContainer
//                 config={{
//                   [label]: { label, color },
//                 }}
//                 className="mx-auto aspect-square max-h-[250px]"
//               >
//                 <PieChart>
//                   <ChartTooltip
//                     content={<ChartTooltipContent nameKey="value" />}
//                   />
//                   <Pie
//                     data={formattedData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius="80%"
//                   >
//                     <LabelList
//                       dataKey="name"
//                       className="fill-background"
//                       stroke="none"
//                       fontSize={12}
//                     />
//                   </Pie>
//                 </PieChart>
//               </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 font-medium leading-none">
//                 Proporción basada en valores redondeados
//               </div>
//               <div className="leading-none text-muted-foreground">
//                 Total: {totalCount} valores registrados
//               </div>
//             </CardFooter>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default CircleGraphs;

// "use client";

// import React, { useEffect, useState } from "react";
// import { Pie, PieChart, LabelList } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { fetchCountData, CountDataResponse } from "@/utils/apiUtils";

// // API URLs and metadata
// const apiDetails = [
//   {
//     url: "http://192.168.0.126/apis/temperatura/getCountValor.php",
//     label: "Temperatura",
//     baseColor: "#a8dadc",
//   },
//   {
//     url: "http://192.168.0.126/apis/humedad/getCountValor.php",
//     label: "Humedad",
//     baseColor: "#add8e6",
//   },
//   {
//     url: "http://192.168.0.126/apis/calidad_de_aire/getCountValor.php",
//     label: "Calidad del Aire",
//     baseColor: "#8fbdd3",
//   },
//   {
//     url: "http://192.168.0.126/apis/dioxido_de_carbono/getCountValor.php",
//     label: "Dióxido de Carbono",
//     baseColor: "#457b9d",
//   },
//   {
//     url: "http://192.168.0.126/apis/contaminacion_acustica/getCountValor.php",
//     label: "Contaminación Acústica",
//     baseColor: "#1d3557",
//   },
// ];

// // Utility to generate complementary color palette
// const generateColorPalette = (baseColor: string, count: number) => {
//   const shades = [];
//   for (let i = 0; i < count; i++) {
//     shades.push(
//       `${baseColor}${Math.floor(255 - (i * 20)).toString(16).padStart(2, "0")}` // Adjust shade
//     );
//   }
//   return shades;
// };

// const CircleGraphs: React.FC = () => {
//   const [chartData, setChartData] = useState<{
//     [key: string]: CountDataResponse[];
//   }>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const dataMap: { [key: string]: CountDataResponse[] } = {};

//       for (const { url, label } of apiDetails) {
//         const data = await fetchCountData(url);
//         dataMap[label] = data;
//       }

//       setChartData(dataMap);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
//       {apiDetails.map(({ label, baseColor }) => {
//         const data = chartData[label] || [];

//         // Compute the total sum of counts
//         const totalCount = data.reduce((sum, item) => sum + item.count, 0);

//         // Determine the largest section and assign colors
//         const sortedData = [...data].sort((a, b) => b.count - a.count);
//         const mainColor = baseColor;
//         const otherColors = generateColorPalette(baseColor, data.length - 1);

//         // Assign colors to the data points
//         const formattedData = sortedData.map((item, index) => ({
//           name: item.rounded_value,
//           value: (item.count / totalCount) * 100, // Proportional value
//           fill: index === 0 ? mainColor : otherColors[index - 1],
//         }));

//         return (
//           <Card key={label}>
//             <CardHeader className="items-center pb-0">
//               <CardTitle>{label} - Distribución</CardTitle>
//               <CardDescription>
//                 Distribución proporcional de los valores redondeados.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 pb-0">
//               <ChartContainer
//                 config={{
//                   [label]: { label, color: mainColor },
//                 }}
//                 className="mx-auto aspect-square max-h-[250px]"
//               >
//                 <PieChart>
//                   <ChartTooltip
//                     content={<ChartTooltipContent nameKey="value" />}
//                     // content={<ChartTooltipContent nameKey="value" />}
//                   />
//                   <Pie
//                     data={formattedData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius="80%"
//                   >
//                     <LabelList
//                       dataKey="name"
//                       className="fill-background"
//                       stroke="none"
//                       fontSize={12}
//                     />
//                   </Pie>
//                 </PieChart>
//               </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 font-medium leading-none">
//                 Proporción basada en valores redondeados
//               </div>
//               <div className="leading-none text-muted-foreground">
//                 Total: {totalCount} valores registrados
//               </div>
//             </CardFooter>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default CircleGraphs;

// "use client";

// import React, { useEffect, useState } from "react";
// import { Pie, PieChart, Sector } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { fetchCountData, CountDataResponse } from "@/utils/apiUtils";

// // API URLs and metadata
// const apiDetails = [
//   {
//     url: "http://192.168.0.126/apis/temperatura/getCountValor.php",
//     label: "Temperatura",
//     baseColor: "#a8dadc",
//   },
//   {
//     url: "http://192.168.0.126/apis/humedad/getCountValor.php",
//     label: "Humedad",
//     baseColor: "#add8e6",
//   },
//   {
//     url: "http://192.168.0.126/apis/calidad_de_aire/getCountValor.php",
//     label: "Calidad del Aire",
//     baseColor: "#8fbdd3",
//   },
//   {
//     url: "http://192.168.0.126/apis/dioxido_de_carbono/getCountValor.php",
//     label: "Dióxido de Carbono",
//     baseColor: "#457b9d",
//   },
//   {
//     url: "http://192.168.0.126/apis/contaminacion_acustica/getCountValor.php",
//     label: "Contaminación Acústica",
//     baseColor: "#1d3557",
//   },
// ];

// // Utility to generate complementary color palette
// const generateColorPalette = (baseColor: string, count: number) => {
//   const shades = [];
//   for (let i = 0; i < count; i++) {
//     shades.push(
//       `${baseColor}${Math.floor(255 - i * 20)
//         .toString(16)
//         .padStart(2, "0")}` // Adjust shade
//     );
//   }
//   return shades;
// };

// const CircleGraphs: React.FC = () => {
//   const [chartData, setChartData] = useState<{
//     [key: string]: CountDataResponse[];
//   }>({});
//   const [activeIndex, setActiveIndex] = useState(0); // Track active sector for the donut chart

//   useEffect(() => {
//     const fetchData = async () => {
//       const dataMap: { [key: string]: CountDataResponse[] } = {};

//       for (const { url, label } of apiDetails) {
//         const data = await fetchCountData(url);
//         dataMap[label] = data;
//       }

//       setChartData(dataMap);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
//       {apiDetails.map(({ label, baseColor }) => {
//         const data = chartData[label] || [];

//         // Compute the total sum of counts
//         const totalCount = data.reduce((sum, item) => sum + item.count, 0);

//         // Determine the largest section and assign colors
//         const sortedData = [...data].sort((a, b) => b.count - a.count);
//         const mainColor = baseColor;
//         const otherColors = generateColorPalette(baseColor, data.length - 1);

//         // Assign colors to the data points
//         const formattedData = sortedData.map((item, index) => ({
//           name: item.rounded_value,
//           value: (item.count / totalCount) * 100, // Proportional value
//           fill: index === 0 ? mainColor : otherColors[index - 1],
//         }));

//         return (
//           <Card key={label} className="">
//             <CardHeader className="items-center pb-0">
//               <CardTitle>{label} - Distribución</CardTitle>
//               <CardDescription>
//                 Distribución proporcional de los valores redondeados.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 pb-0">
//               <ChartContainer
//                 config={{
//                   [label]: { label, color: mainColor },
//                 }}
//                 className="mx-auto aspect-square max-h-[250px]"
//               >
//                 <PieChart className="p-auto">
//                   <ChartTooltip
//                     cursor={false}
//                     content={<ChartTooltipContent nameKey="value" />}
//                   />
//                   <Pie
//                     data={formattedData}
//                     dataKey="value"
//                     nameKey="name"
//                     innerRadius={60}
//                     outerRadius={80}
//                     strokeWidth={5}
//                     activeIndex={activeIndex}
//                     activeShape={({
//                       cx,
//                       cy,
//                       innerRadius,
//                       outerRadius,
//                       startAngle,
//                       endAngle,
//                       fill,
//                     }: any) => (
//                       <Sector
//                         cx={cx}
//                         cy={cy}
//                         innerRadius={innerRadius}
//                         outerRadius={outerRadius + 10} // Highlight the active sector
//                         startAngle={startAngle}
//                         endAngle={endAngle}
//                         fill={fill}
//                       />
//                     )}
//                     onMouseEnter={(_, index) => setActiveIndex(index)} // Set active index on hover
//                     onMouseLeave={() => setActiveIndex(0)} // Reset on leave
//                   />
//                 </PieChart>
//               </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col gap-2 text-sm">
//               <div className="flex items-center gap-2 font-medium leading-none">
//                 Proporción basada en valores redondeados
//               </div>
//               <div className="leading-none text-muted-foreground">
//                 Total: {totalCount} valores registrados
//               </div>
//             </CardFooter>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default CircleGraphs;

"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Sector, TooltipProps } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { fetchCountData, CountDataResponse } from "@/utils/apiUtils";

// API URLs and metadata
const apiDetails = [
  {
    url: "http://192.168.0.126/apis/temperatura/getCountValor.php",
    label: "Temperatura",
    baseColor: "#a8dadc",
    unit: "°C",
  },
  {
    url: "http://192.168.0.126/apis/humedad/getCountValor.php",
    label: "Humedad",
    baseColor: "#add8e6",
    unit: "%",
  },
  {
    url: "http://192.168.0.126/apis/calidad_de_aire/getCountValor.php",
    label: "Calidad del Aire",
    baseColor: "#8fbdd3",
    unit: "PPM",
  },
  {
    url: "http://192.168.0.126/apis/dioxido_de_carbono/getCountValor.php",
    label: "Dióxido de Carbono",
    baseColor: "#457b9d",
    unit: "PPM",
  },
  {
    url: "http://192.168.0.126/apis/contaminacion_acustica/getCountValor.php",
    label: "Contaminación Acústica",
    baseColor: "#1d3557",
    unit: "dB",
  },
];

// Utility to generate complementary color palette
const generateColorPalette = (baseColor: string, count: number) => {
  const shades = [];
  for (let i = 0; i < count; i++) {
    shades.push(
      `${baseColor}${Math.floor(255 - i * 20)
        .toString(16)
        .padStart(2, "0")}` // Adjust shade
    );
  }
  return shades;
};

// Custom Tooltip for PieChart
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-2 rounded-md text-xs">
        <p>{`Value: ${data.name}`}</p>
        <p>{`Proportion: ${data.value.toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const CircleGraphs: React.FC = () => {
  const [chartData, setChartData] = useState<{
    [key: string]: CountDataResponse[];
  }>({});
  const [activeIndices, setActiveIndices] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const dataMap: { [key: string]: CountDataResponse[] } = {};
      const initialActiveIndices: { [key: string]: number } = {};

      for (const { url, label } of apiDetails) {
        const data = await fetchCountData(url);
        dataMap[label] = data;

        // Find the largest section and set as active
        // const largestIndex = data.reduce(
        //   (maxIdx, item, idx, arr) =>
        //     item.count > arr[maxIdx].count ? idx : maxIdx,
        //   0
        // );
        // initialActiveIndices[label] = largestIndex;
      }

      setChartData(dataMap);
      setActiveIndices(initialActiveIndices);
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
      {apiDetails.map(({ label, baseColor, unit }) => {
        const data = chartData[label] || [];

        // Compute the total sum of counts
        const totalCount = data.reduce((sum, item) => sum + item.count, 0);

        // Determine the largest section and assign colors
        const sortedData = [...data].sort((a, b) => b.count - a.count);
        const mainColor = baseColor;
        const otherColors = generateColorPalette(baseColor, data.length - 1);

        // Assign colors to the data points
        const formattedData = sortedData.map((item, index) => ({
          name: item.rounded_value,
          value: (item.count / totalCount) * 100, // Proportional value
          fill: index === 0 ? mainColor : otherColors[index - 1],
        }));

        const handleMouseEnter = (index: number) => {
          setActiveIndices((prev) => ({ ...prev, [label]: index }));
        };

        const handleMouseLeave = () => {
          setActiveIndices((prev) => ({ ...prev, [label]: -1 }));
        };

        return (
          <Card key={label}>
            <CardHeader className="items-center pb-0">
              <CardTitle>{label} - Distribución</CardTitle>
              <CardDescription>
                Distribución proporcional de los valores redondeados.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={{
                  [label]: { label, color: mainColor },
                }}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <Pie
                    data={formattedData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    strokeWidth={5}
                    activeIndex={activeIndices[label]}
                    activeShape={(props: any) => (
                      <Sector
                        {...props}
                        outerRadius={props.outerRadius + 10} // Highlight active sector
                      />
                    )}
                    onMouseEnter={(_, index) => handleMouseEnter(index)} // Set active index on hover
                    onMouseLeave={handleMouseLeave} // Reset on leave
                  />
                  <ChartTooltip content={<CustomTooltip />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Proporción basada en valores redondeados
              </div>
              <div className="leading-none text-muted-foreground">
                Total: {totalCount} valores registrados
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CircleGraphs;
