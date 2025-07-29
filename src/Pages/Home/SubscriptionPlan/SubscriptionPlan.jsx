import React from "react";
import { Link } from "react-router";

const SubscriptionPlan = () => {
  const plans = [
    { duration: "1 Minute Premium", price: 1 },
    { duration: "5 Days Premium", price: 5 },
    { duration: "10 Days Premium", price: 10 },
  ];

  return (
    <div className="my-12 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">
        Choose Your Premium Subscription Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="rounded-lg p-6  shadow-lg border-gray-50 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-4">{plan.duration}</h3>
            <p className="text-2xl font-bold text-[#00001A] mb-6">
              ${plan.price}
            </p>
            <Link
              to={"/subscription"}
              className="bg-[#000036] text-white py-2 px-4 rounded inline-block"
            >
              Subscribe Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
