import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PremiumArticles = () => {
  const { user } = useAuth();

  const { data: premiumArticles = [], isLoading } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/premium-articles`
      );
      return res.data;
    },
  });

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading premium articles...</p>;
  }

  // সাবস্ক্রিপশন চেক (expiry date compare)
  const isSubscribed =
    dbUser?.premiumTaken && new Date(dbUser.premiumTaken) > new Date();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00001A]">
        Premium Articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumArticles.map((article) => {
          const isPremium = article?.isPremium;

          return (
            <div
              key={article._id}
              className={`shadow rounded-lg p-4 flex flex-col transition-all duration-300 ${
                isPremium ? "bg-yellow-50 border border-yellow-500" : "bg-white"
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Publisher: {article.publisher}
              </p>
              <p className="mt-2 text-gray-700 text-sm">
                {article.description?.slice(0, 100)}...
              </p>
              <Link
                to={
                  isPremium && !isSubscribed ? "#" : `/article/${article._id}`
                }
                className={`my-auto btn btn-sm w-full mt-4 ${
                  isPremium && !isSubscribed
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#00001A] text-white hover:bg-[#2e2e2e]"
                }`}
              >
                {isPremium && !isSubscribed
                  ? "Premium - Subscribe Required"
                  : "View Details"}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumArticles;
