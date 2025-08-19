import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const SubscriptionModal = ({ isOpen, onClose, onSubscribe }) => {
  const { user } = useAuth();

  // DB থেকে ইউজার ডেটা ফেচ
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return null;

  // প্রিমিয়াম অ্যাক্টিভ কিনা চেক
  const isPremiumActive =
    dbUser?.premiumTaken && new Date(dbUser.premiumTaken) > new Date();

  // যদি মডাল অফ থাকে বা প্রিমিয়াম অ্যাক্টিভ থাকে → কিছুই দেখাবো না
  if (!isOpen || isPremiumActive) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-black text-center mb-2">
          Unlock Premium Features 🚀
        </h2>
        <p className="text-gray-600 text-center  mb-4">
          Subscribe now to get access to powerful tools and premium articles!
        </p>

        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span className="text-black">Access to exclusive premium articles</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span className="text-black">Add unlimited articles to your profile</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" checked readOnly className="checkbox checkbox-success" />
            <span className="text-black">Stay ahead with curated content</span>
          </li>
        </ul>

        <button
          onClick={onSubscribe}
          className="btn btn-primary w-full mb-2"
        >
          View Subscription Plans
        </button>
        <button
          onClick={onClose}
          className="btn btn-ghost text-black bg-gray-200 w-full"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
