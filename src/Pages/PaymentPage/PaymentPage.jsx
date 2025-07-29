// src/pages/PaymentPage.jsx
import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const { period, price } = state || {};
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          price,
        })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
           // Get JWT token and send with the request
      const token = await user.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/subscription`,
        {
          email: user.email,
          period,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Subscription successful!");
      navigate("/");
    }
    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Premium Subscription
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Subscription Duration:{" "}
        <strong>
          {period === "1" ? "1 Minute" : period === "5" ? "5 Days" : "10 Days"}
        </strong>
        <br />
        Amount to Pay: <strong>${price}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <CardElement className="p-3 border rounded-md mb-4" />
        <button
          disabled={!stripe || processing}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all cursor-pointer"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
