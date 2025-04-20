"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Line Chart Component
export function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 6000, 4500, 3500, 6500, 7000, 8000, 5500, 9000],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

// Bar Chart Component
export function BarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 5000, 6000, 4500, 3500, 6500, 7000, 8000, 5500, 9000],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [800, 1200, 1800, 2000, 2200, 1800, 1500, 2500, 2800, 3000, 2200, 3500],
        backgroundColor: "rgba(244, 114, 182, 0.5)",
        borderColor: "rgb(244, 114, 182)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

// Pie Chart Component
export function PieChart() {
  const data = {
    labels: ["Luxury Beach House", "Downtown Loft", "Mountain Cabin"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["rgba(99, 102, 241, 0.5)", "rgba(244, 114, 182, 0.5)", "rgba(251, 191, 36, 0.5)"],
        borderColor: ["rgb(99, 102, 241)", "rgb(244, 114, 182)", "rgb(251, 191, 36)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  return <Pie data={data} options={options} />
}

