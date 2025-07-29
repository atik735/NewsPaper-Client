import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'

const MyArticles = () => {
  const { user } = useAuth()
  const [declineReason, setDeclineReason] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Axios instance with JWT
  const fetchArticles = async () => {
    const token = await user.getIdToken()
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/myarticles?email=${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return res.data
  }

  // TanStack Query
  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ['myarticles', user?.email],
    queryFn: fetchArticles,
    enabled: !!user?.email, // Only run when user is loaded
  })

  // Delete article
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${id}`)
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Your article has been deleted.', 'success')
          refetch() // TanStack Query re-fetch
        }
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete article.', 'error')
      }
    }
  }

  if (isLoading) return <p className="text-center">Loading your articles...</p>

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-lime-100">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Details</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id} className="border-b">
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>
                    {article.status === 'declined' ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-500 font-medium">Declined</span>
                        <button
                          className="text-xs bg-red-100 px-2 py-1 rounded"
                          onClick={() => {
                            setDeclineReason(article.declineReason || 'No reason provided')
                            setShowModal(true)
                          }}
                        >
                          Why?
                        </button>
                      </div>
                    ) : article.status === 'approved' ? (
                      <span className="text-green-500 font-medium">Approved</span>
                    ) : (
                      <span className="text-yellow-500 font-medium">Pending</span>
                    )}
                  </td>
                  <td>{article.isPremium ? 'Yes' : 'No'}</td>
                  <td>
                    <Link
                      to={`/articles/${article._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/update-article/${article._id}`}
                      className="bg-lime-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Decline Reason */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Decline Reason</h2>
            <p className="mb-4 text-gray-700">{declineReason}</p>
            <button
              className="bg-lime-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyArticles
