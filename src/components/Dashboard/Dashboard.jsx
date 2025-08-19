import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/articles`)
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  // Pie Chart Data (Publisher-wise percentage)
  const getPieChartData = () => {
    const counts = {};
    articles.forEach(article => {
      const pub = article.publisher;
      counts[pub] = (counts[pub] || 0) + 1;
    });

    const total = articles.length;
    const data = [["Publisher", "Percentage"]];
    for (let pub in counts) {
      const percent = (counts[pub] / total) * 100;
      data.push([pub, percent]);
    }
    return data;
  };

  // Bar Chart Data (Premium vs Free)
  const getPremiumChartData = () => {
    const premium = articles.filter(a => a.isPremium).length;
    const free = articles.filter(a => !a.isPremium).length;
    return [
      ["Type", "Count", { role: "style" }],
      ["Premium", premium, "#0CA678"],
      ["Free", free, "#339AF0"],
    ];
  };

  // Line Chart Data (Status overview)
  const getStatusChartData = () => {
    const approved = articles.filter(a => a.status === "approved").length;
    const declined = articles.filter(a => a.status === "declined").length;
    const pending = articles.filter(a => a.status === "pending").length;
    return [
      ["Status", "Articles"],
      ["Approved", approved],
      ["Declined", declined],
      ["Pending", pending],
    ];
  };

  return (
    <div className="p-6 space-y-16">
      {/* Pie Chart */}
      <div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Publisher Article Percentage</h2>
        <Chart
          chartType="PieChart"
          data={getPieChartData()}
          options={{
            pieHole: 0.4,
            is3D: false,
            legend: { position: "right", alignment: "center" },
          }}
          width="100%"
          height="400px"
        />
      </div>

      {/* Bar Chart */}
      <div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Premium vs Free Articles</h2>
        <Chart
          chartType="BarChart"
          data={getPremiumChartData()}
          options={{
            chartArea: { width: "60%" },
            hAxis: {
              title: "Count",
              minValue: 0,
            },
            vAxis: {
              title: "Type",
            },
          }}
          width="100%"
          height="400px"
        />
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Article Status Overview</h2>
        <Chart
          chartType="LineChart"
          data={getStatusChartData()}
          options={{
            hAxis: { title: "Status" },
            vAxis: { title: "Articles" },
            legend: "none",
          }}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default Dashboard;
