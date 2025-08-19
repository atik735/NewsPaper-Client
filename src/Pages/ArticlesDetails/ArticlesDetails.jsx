import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa";

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["articleDetails", id],
    queryFn: async () => {
      // Get JWT token
      const token = await user.getIdToken();
      
      // Send request with Authorization header
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/articles/${id}?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    retry: false, // Optional: prevent retry on failure to handle errors gracefully
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1>Loading...........</h1>
      </div>
    );
  }

  if (isError || !article) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Could not load article!",
    });
    return <div className="text-center text-red-500">Article not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white my-2 rounded">
      {/* Publisher Badge */}
      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full ">
        {article.publisher}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-3">
        {article.title}
      </h1>

      {/* Author + Date + Views */}
      <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm mb-6">
        <img
          src={article.authorImage}
          alt={article.authorName}
          className="w-7 h-7 rounded-full border"
        />
        <span className="font-medium">{article.authorName}</span>
        <span>• {article.createdAt ? format(new Date(article.createdAt), "PPP") : "N/A"}</span>
        <span className="flex items-center gap-1">
          <FaEye size={16} /> {article.views} views
        </span>
      </div>

      {/* Image */}
      <div className="mb-2">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[420px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="text-lg text-gray-800 leading-relaxed">
        {article.description}
      </div>
    </div>
  );
};

export default ArticleDetails;
