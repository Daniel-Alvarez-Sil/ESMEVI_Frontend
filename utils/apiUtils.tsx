"use client"

  export interface StatsResponse {
    avg: string;
    max: string;
    min: string;
  }

// Estadísticas en un rango de fechas   
  export async function fetchStatsWithDateRange(
    url: string,
    fechaInicio: string,
    fechaFin: string
  ): Promise<StatsResponse | null> {
    const fullUrl = `${url}?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    try {
      const response = await fetch(fullUrl);
      console.log(`Fetching data from: ${fullUrl}`); // Log URL
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data); // Log API response
  
      if (!data.avg || !data.max || !data.min) {
        console.warn("Unexpected API response format");
        return null;
      }
  
      return {
        avg: parseFloat(data.avg).toFixed(2),
        max: parseFloat(data.max).toFixed(2),
        min: parseFloat(data.min).toFixed(2),
      };
    } catch (error) {
      console.error("Error fetching stats:", error);
      return null;
    }
  }

// Datos en un rango de fechas   
  export interface ApiResponse {
    valor: string;
    fechahora: string;
    id_medida: number;
    id_componente: number;
  }
  
  export async function fetchFilteredData(
    url: string,
    fechaInicio: string,
    fechaFin: string
  ): Promise<ApiResponse[]> {
    const fullUrl = `${url}?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    
    console.log(`Fetching data from: ${fullUrl}`); // Log the full API URL for debugging
  
    try {
      const response = await fetch(fullUrl);
      console.log(`API Response Status: ${response.status}`); // Log response status
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`API Response Data:`, data); // Log the raw response data
  
      if (!Array.isArray(data)) {
        console.warn(`Unexpected data format:`, data);
        return []; // Return an empty array if the data is not an array
      }
  
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${fullUrl}:`, error);
      return []; // Return an empty array on failure
    }
  }

// Último valor   
  export interface ActualDataResponse {
    valor: string;
    fechahora: string;
    id_medida: number;
    id_componente: number;
  }
  
  /**
   * Fetch the latest record from a given API URL.
   * @param url The API endpoint to fetch data from.
   * @returns A promise resolving to the latest record or null on failure.
   */
  export async function fetchActualData(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: ActualDataResponse = await response.json();
      if (data.valor) {
        return parseFloat(data.valor).toFixed(2); // Round to two decimals
      } else {
        console.warn(`No 'valor' field in response from ${url}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  }
  
  // Sensores utilizados
  export interface SensorResponse {
    sensor: string[];
  }
  
  /**
   * Fetch sensors from the given API URL.
   * @param url The API endpoint to fetch sensors.
   * @returns A promise resolving to an array of sensor names or an empty array on failure.
   */
  export async function fetchSensors(url: string): Promise<string[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: SensorResponse = await response.json();
      if (data.sensor && Array.isArray(data.sensor)) {
        return data.sensor; // Return sensor array
      } else {
        console.warn("Unexpected API response format:", data);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching sensors from ${url}:`, error);
      return []; // Return empty array on error
    }
  }
  
// Recolecta las estadísticas históricas
export async function fetchStats(url: string): Promise<StatsResponse | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: StatsResponse = await response.json();
    return {
      avg: parseFloat(data.avg).toFixed(2),
      max: parseFloat(data.max).toFixed(2),
      min: parseFloat(data.min).toFixed(2),
    };
  } catch (error) {
    console.error(`Error fetching stats from ${url}:`, error);
    return null;
  }
}

export async function fetchCalidadDeAireData() {
  const response = await fetch("http://192.168.0.126/apis/calidad_de_aire/getAll.php");
  if (!response.ok) {
    throw new Error("Failed to fetch calidad de aire data");
  }
  return response.json();
}

export async function fetchDioxidoDeCarbonoData() {
  const response = await fetch("http://192.168.0.126/apis/dioxido_de_carbono/getAll.php");
  if (!response.ok) {
    throw new Error("Failed to fetch dioxido de carbono data");
  }
  return response.json();
}

export async function fetchAllData(apiUrl: string): Promise<ApiAllResponse[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: ApiAllResponse[] = await response.json();
    return data.map((item) => ({
      ...item,
       // Ensure numeric values
    }));
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
    return [];
  }
}

export type ApiAllResponse = {
  id: string;
  valor: number;
  fechahora: string;
  id_componente: string;
  id_medida: string;
};

export async function fetchContaminacionAcusticaData() {
  const response = await fetch("http://192.168.0.126/apis/contaminacion_acustica/getAll.php");
  if (!response.ok) {
    throw new Error("Failed to fetch contaminación acústica data");
  }
  return response.json();
}
