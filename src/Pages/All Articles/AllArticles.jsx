import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const AllArticles = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [tags, setTags] = useState("");
  const [dbUser, setDbUser] = useState(null);

  // Fetch logged-in user's DB data (for subscription check)
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user?email=${user.email}`)
        .then((res) => setDbUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [user?.email]);

  // Check if user is subscribed
  const isSubscribed =
    dbUser?.premiumTaken && new Date(dbUser.premiumTaken) > new Date();

  // Fetch publishers dynamically with TanStack Query
  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
      return res.data;
    },
  });

  // Fetch Articles
  const fetchArticles = () => {
    const params = {};
    if (search) params.search = search;
    if (publisher) params.publisher = publisher;
    if (tags) params.tags = tags;

    axios
      .get(`${import.meta.env.VITE_API_URL}/articles`, { params })
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchArticles();
  }, [search, publisher, tags]);

  const handlePremiumClick = (e, isPremium) => {
    if (isPremium && !isSubscribed) {
      e.preventDefault();
      toast.error("Please subscribe to view this premium article.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          onChange={(e) => setPublisher(e.target.value)}
        >
          <option value="">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          onChange={(e) => setTags(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className={`relative p-4 border rounded shadow ${
              article.isPremium
                ? "bg-yellow-50 border-yellow-400"
                : "bg-white"
            }`}
          >
            {article.isPremium && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                Premium
              </span>
            )}
            <img
              src={article.image}
              alt={article.title}
              className="mb-2 h-40 w-full object-cover rounded"
            />
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.publisher}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short description */}
            <p className="mt-2 text-gray-700 text-sm">
              {article.description?.slice(0, 100)}...
            </p>

            <Link
              to={article.isPremium && !isSubscribed ? "#" : `/articles/${article._id}`}
              onClick={(e) => handlePremiumClick(e, article.isPremium)}
            >
              <button
                disabled={article.isPremium && !isSubscribed}
                className={`mt-4 btn w-full ${
                  article.isPremium
                    ? "bg-yellow-500 text-white"
                    : "btn bg-black text-white"
                }`}
              >
                {article.isPremium && !isSubscribed
                  ? "Subscribe to View"
                  : "Details"}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;

