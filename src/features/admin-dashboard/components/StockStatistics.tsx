import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartData,
  BarElement,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { Tooltip } from "chart.js";
import useAxios from "../../../hooks/useAxios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { ProductDetails } from "../../../types";
import { stockColor } from "../../../utils";

const StockStatistics = () => {
  const { data, error, loading } = useAxios<ProductDetails[]>({
    url: "/api/products/stats",
    method: "get",
  });

  const labels: (string | string[])[] = [];
  const values: number[] = [];
  const colors: string[] = [];

  if (data) {
    data.forEach((product) => {
      labels.push(product.name.length < 30 ? product.name : product.name.split(" "));
      values.push(product.stock);
      colors.push(stockColor(product.stock));
    });
  }
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
    },
    animation: {
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
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
        {error && <p className="alert alert-danger">{error}</p>}
        {data && <Bar id="stockStats" options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
};

export default StockStatistics;
