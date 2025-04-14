"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { VisitorData } from "../../services/analytics";

Chart.register(...registerables);

interface CountryDistributionProps {
  visitors: VisitorData[];
}

export default function CountryDistribution({
  visitors,
}: CountryDistributionProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || visitors.length === 0) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Count countries
    const countryCounts = visitors.reduce<Record<string, number>>(
      (acc, visitor) => {
        const country = visitor.country || "Unknown";
        if (!acc[country]) {
          acc[country] = 0;
        }
        acc[country]++;
        return acc;
      },
      {}
    );

    // Prepare data for chart
    const countries = Object.keys(countryCounts);
    const counts = countries.map((country) => countryCounts[country]);

    // Create color palette based on number of countries
    const generateColors = (count: number) => {
      const baseColor = [245, 222, 179]; // wheat in RGB
      return Array.from({ length: count }, (_, i) => {
        const shade = 1 - i * 0.15; // Decrease brightness for each country
        return `rgba(${baseColor[0] * shade}, ${baseColor[1] * shade}, ${baseColor[2] * shade}, 0.8)`;
      });
    };

    const colors = generateColors(countries.length);

    // Create the chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: countries,
          datasets: [
            {
              label: "Visitors by Country",
              data: counts,
              backgroundColor: colors,
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y", // Horizontal bar chart
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "rgba(245, 222, 179, 1)",
              bodyColor: "rgba(245, 222, 179, 1)",
              callbacks: {
                label: function (context) {
                  const value = context.raw as number;
                  const total = visitors.length;
                  const percentage = Math.round((value / total) * 100);
                  return `${value} visitors (${percentage}%)`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: "rgba(245, 222, 179, 0.1)",
              },
              ticks: {
                color: "rgba(245, 222, 179, 0.7)",
                precision: 0,
              },
            },
            y: {
              grid: {
                color: "rgba(245, 222, 179, 0.1)",
              },
              ticks: {
                color: "rgba(245, 222, 179, 0.7)",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [visitors]);

  if (visitors.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-wheat/60">
        <p>No visitor data available</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <canvas ref={chartRef} />
    </div>
  );
}
