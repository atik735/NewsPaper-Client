import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const TrendingArticles = () => {
  const { user } = useAuth();
  const [trending, setTrending] = useState([]);
  const [dbUser, setDbUser] = useState(null);

  // Fetch trending articles
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/articles/trending`)
      .then((res) => setTrending(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch logged-in user's DB info (for subscription check)
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user?email=${user.email}`)
        .then((res) => setDbUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  // Subscription check
  const isSubscribed =
    dbUser?.premiumTaken && new Date(dbUser.premiumTaken) > new Date();

  const handlePremiumClick = (e, isPremium) => {
    if (isPremium && !isSubscribed) {
      e.preventDefault();
      toast.error("Please subscribe to view this premium article.");
    }
  };

  return (
    <div className="my-10 px-4">
      <h1 className="text-2xl font-bold mb-5 text-center dark:text-white">
        Trending Articles
      </h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {trending.map((article) => (
          <SwiperSlide key={article._id}>
            <div
              className={`relative card shadow-lg w-full border-gray-300 border rounded-xl overflow-hidden ${
                article.isPremium
                  ? "bg-yellow-50 border-yellow-400"
                  : "bg-white"
              }`}
            >
              {/* Premium Badge */}
              {article.isPremium && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                  Premium
                </span>
              )}

              <figure className="w-full h-60">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body text-start">
                <h2 className="text-lg font-bold text-gray-800">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Publisher: {article.publisher}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-black bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className=" text-gray-700 text-sm">
                  {article.description?.slice(0, 100)}...
                </p>

                <p className="text-sm text-gray-400">Views: {article.views}</p>
                <div className="mt-3">
                  <Link
                    to={
                      article.isPremium && !isSubscribed
                        ? "#"
                        : `/articles/${article._id}`
                    }
                    onClick={(e) => handlePremiumClick(e, article.isPremium)}
                  >
                    <button
                      disabled={article.isPremium && !isSubscribed}
                      className={`btn btn-sm w-full ${
                        article.isPremium
                          ? "bg-yellow-500 text-black"
                          : "btn bg-black text-white"
                      }`}
                    >
                      {article.isPremium && !isSubscribed
                        ? "Subscribe to View"
                        : "Read More"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticles;
