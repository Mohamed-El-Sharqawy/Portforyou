"use client";

import { useEffect, useRef } from "react";
import { VisitorData } from "../../services/analytics";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { format, parseISO } from "date-fns";

Chart.register(...registerables);

interface VisitorChartProps {
  visitors: VisitorData[];
}

export default function VisitorChart({ visitors }: VisitorChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || visitors.length === 0) return;

    // Process visitor data to count visits per day
    const visitsPerDay = visitors.reduce<Record<string, number>>(
      (acc, visitor) => {
        if (!visitor.visitDate) return acc;

        // Format the date to YYYY-MM-DD to group by day
        const day = format(new Date(parseInt(visitor.visitDate)), "yyyy-MM-dd");
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      },
      {}
    );

    // Get the last 30 days or all days if less than 30
    const sortedDays = Object.keys(visitsPerDay).sort();
    const days = sortedDays.slice(Math.max(0, sortedDays.length - 30));
    const counts = days.map((day) => visitsPerDay[day]);

    // Format days for display
    const formattedDays = days.map((day) => format(parseISO(day), "MMM d"));

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: formattedDays,
        datasets: [
          {
            label: "Visits",
            data: counts,
            borderColor: "rgba(245, 222, 179, 0.8)",
            backgroundColor: "rgba(245, 222, 179, 0.2)",
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "rgba(245, 222, 179, 1)",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "rgba(245, 222, 179, 1)",
            bodyColor: "rgba(245, 222, 179, 0.8)",
            padding: 10,
            cornerRadius: 4,
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => {
                return tooltipItems[0].label || "";
              },
              label: (context) => {
                const value = context.parsed.y;
                return `${value} ${value === 1 ? "visit" : "visits"}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(245, 222, 179, 0.1)",
            },
            ticks: {
              color: "rgba(245, 222, 179, 0.7)",
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(245, 222, 179, 0.1)",
            },
            ticks: {
              color: "rgba(245, 222, 179, 0.7)",
              precision: 0,
            },
          },
        },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, config);

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
