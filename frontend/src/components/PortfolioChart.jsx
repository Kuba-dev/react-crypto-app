import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets, crypto } = useCrypto();

  const data = {
    labels: assets.map((c) => c.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => asset.totalAmount.toFixed(2)),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(64, 189, 124, 1)",
          "rgba(204, 82, 213 1)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        height: "400px",
        justifyContent: "center",
      }}
    >
      <Pie data={data} />
    </div>
  );
}
