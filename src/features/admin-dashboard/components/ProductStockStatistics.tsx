import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartData, BarElement, Title, Legend, CategoryScale, LinearScale, ChartOptions } from "chart.js";
import { Tooltip } from "chart.js";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useGetProductStockStatistics } from "../../../api/dashboard/getProductStockStatistics";

const ProductStockStatistics = () => {
  const { labels, values, colors, loading, error } = useGetProductStockStatistics({});

  const chartData: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: "Current stock",
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 5,
        },
      },
    },
    animation: {
      delay: (context) => {
        let delay = 0;

        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 20;
        }

        return delay;
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  ChartJS.register(BarElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

  return (
    <div className="stock-statistics">
      <h1>Product stock</h1>
      <div className="stock-graph">
        {loading && <LoadingSpinner />}
        {error && <p className="alert alert-danger">{error.message}</p>}
        {!loading && !error && <Bar id="stockStats" options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
};

export default ProductStockStatistics;
