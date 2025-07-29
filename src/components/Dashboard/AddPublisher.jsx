import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const AddPublisher = () => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState(null);

  // Fetch publishers
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
      return res.data;
    },
  });

  // Image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const url = await imageUpload(image);
    setLogo(url);
  };

  // Add publisher
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (!logo) return toast.error("Please upload a logo!");

    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/publishers`, { name, logo });
      toast.success("Publisher added!");
      queryClient.invalidateQueries(['publishers']); // refresh list
      e.target.reset();
      setLogo(null);
    } catch {
      toast.error("Failed to add publisher!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete publisher
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the publisher.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00001A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/publishers/${id}`);
        toast.success("Publisher deleted!");
        queryClient.invalidateQueries(['publishers']); // refresh list
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Publisher</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Publisher Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter publisher name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Publisher Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          {logo && <p className="text-sm text-green-500 mt-1">Logo uploaded!</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#00001A] text-white py-3 rounded-md"
        >
          {isSubmitting ? "Adding..." : "Add Publisher"}
        </button>
      </form>

      {/* Publisher List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">All Publishers</h3>
        {isLoading ? (
          <p>Loading publishers...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {publishers.map((pub) => (
                  <tr key={pub._id}>
                    <td>
                      <img
                        src={pub.logo}
                        alt={pub.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td>{pub.name}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(pub._id)}
                        className="btn btn-sm btn-error text-white"
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
      </div>
    </div>
  );
};

export default AddPublisher;
