import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);
  const [declineModal, setDeclineModal] = useState({ isOpen: false, id: null, reason: "" });

  // Articles Load
  const fetchArticles = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/articles`)
      .then((res) => setArticles(res.data))
      .catch(() => toast.error("Failed to load articles"));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Approve Article
  const handleApprove = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/articles/${id}/approve`)
      .then(() => {
        toast.success("Article approved!");
        fetchArticles();
      })
      .catch(() => toast.error("Failed to approve article"));
  };

  // Decline Article
  const handleDecline = () => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/articles/${declineModal.id}/decline`, {
        reason: declineModal.reason,
      })
      .then(() => {
        toast.success("Article declined!");
        setDeclineModal({ isOpen: false, id: null, reason: "" });
        fetchArticles();
      })
      .catch(() => toast.error("Failed to decline article"));
  };

  // Make Premium
  const handleMakePremium = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/articles/${id}/premium`, { isPremium: true })
      .then(() => {
        toast.success("Article marked as premium!");
        fetchArticles();
      })
      .catch(() => toast.error("Failed to make premium"));
  };

  // Delete Article
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This article will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/articles/${id}`)
          .then(() => {
            toast.success("Article deleted successfully!");
            fetchArticles();
          })
          .catch(() => toast.error("Failed to delete article"));
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Articles</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Publisher</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article._id}
                className={article.status === "pending" ? "bg-yellow-50" : "bg-white"}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authorImage}
                      alt={article.authorName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{article.authorName}</p>
                      <p className="text-sm text-gray-500">{article.authorEmail}</p>
                    </div>
                  </div>
                </td>
                <td>{article.title}</td>
                <td>{article.publisher}</td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      article.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : article.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="flex flex-col gap-2">
                  {article.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(article._id)}
                        className="btn btn-xs bg-green-100 text-green-700"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => setDeclineModal({ isOpen: true, id: article._id, reason: "" })}
                        className="btn btn-xs bg-red-100 text-red-700"
                      >
                        ✕ Decline
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-xs bg-gray-700 text-white"
                  >
                    🗑 Delete
                  </button>
                  {!article.isPremium && article.status === "approved" && (
                    <button
                      onClick={() => handleMakePremium(article._id)}
                      className="btn btn-xs bg-blue-100 text-blue-700"
                    >
                      ☆ Make Premium
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      {declineModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Decline Reason</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter reason for declining..."
              value={declineModal.reason}
              onChange={(e) => setDeclineModal({ ...declineModal, reason: e.target.value })}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeclineModal({ isOpen: false, id: null, reason: "" })}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleDecline} className="btn btn-sm btn-error text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
