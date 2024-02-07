import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
export default function ChartsOverviewDemo() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response1 = await axios.get("https://retoolapi.dev/o5zMs5/data");
      const response2 = await axios.get("https://retoolapi.dev/gDa8uC/data");

      setYData(response1.data);
      setXData(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BarChart
      series={[
        {
          data: yData
            .filter((ftl) => ftl.id < 51)
            .map((ft) => ft.id < 51 && ft.RandomNumber),
        },
      ]}
      height={500}
      xAxis={[
        {
          data: xData
            .filter((ftl) => ftl.id < 51)
            .sort((a, b) => a.id - b.id)
            .map((ft) => ft.Label),
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
