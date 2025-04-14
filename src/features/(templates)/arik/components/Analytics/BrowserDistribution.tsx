"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { VisitorData } from "../../services/analytics";

Chart.register(...registerables);

interface BrowserDistributionProps {
  visitors: VisitorData[];
}

export default function BrowserDistribution({
  visitors,
}: BrowserDistributionProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || visitors.length === 0) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Count browsers
    const browserCounts = visitors.reduce<Record<string, number>>(
      (acc, visitor) => {
        const browser = visitor.browser;
        if (!acc[browser]) {
          acc[browser] = 0;
        }
        acc[browser]++;
        return acc;
      },
      {}
    );

    // Prepare data for chart
    const browsers = Object.keys(browserCounts);
    const counts = browsers.map((browser) => browserCounts[browser]);
    const colors = [
      "rgba(245, 222, 179, 0.8)", // wheat
      "rgba(200, 180, 150, 0.8)", // darker wheat
      "rgba(180, 160, 130, 0.8)", // even darker wheat
      "rgba(160, 140, 110, 0.8)", // darkest wheat
      "rgba(220, 200, 170, 0.8)", // lighter wheat
    ];

    // Create the chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: browsers,
          datasets: [
            {
              data: counts,
              backgroundColor: colors.slice(0, browsers.length),
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "rgba(245, 222, 179, 0.8)",
                padding: 20,
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "rgba(245, 222, 179, 1)",
              bodyColor: "rgba(245, 222, 179, 1)",
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.raw as number;
                  const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                  ) as number;
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                },
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
