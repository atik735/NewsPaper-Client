// src/pages/SubscriptionPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("1");
  const [price, setPrice] = useState(1);

  const handlePeriodChange = (e) => {
    const value = e.target.value;
    setPeriod(value);
    if (value === "1") setPrice(1);
    if (value === "5") setPrice(5);
    if (value === "10") setPrice(10);
  };

  const handleProceed = () => {
    navigate("/payment", { state: { period, price } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Get Premium Access</h1>
        <p className="text-lg">
          Unlock exclusive premium articles and enjoy uninterrupted reading!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Choose Subscription Plan
        </h2>

        <label className="block text-gray-700 font-medium mb-2">
          Subscription Period:
        </label>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="w-full p-3 border rounded-md mb-4"
        >
          <option value="1">1 Minute - $1</option>
          <option value="5">5 Days - $5</option>
          <option value="10">10 Days - $10</option>
        </select>

        <p className="text-lg font-semibold mb-4">
          Selected Plan:{" "}
          <span className="text-indigo-600">
            {period === "1"
              ? "1 Minute"
              : period === "5"
              ? "5 Days"
              : "10 Days"}
          </span>{" "}
          <span className="ml-2">(${price})</span>
        </p>

        <button
          onClick={handleProceed}
          className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
