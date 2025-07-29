import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const tagsOptions = [
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
];

const AddArticles = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const { user } = useAuth();

  // Fetch publishers dynamically
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
      return res.data.map(pub => ({ value: pub.name, label: pub.name }));
    },
  });

  // Image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    try {
      const imageUrl = await imageUpload(image);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image upload failed");
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    if (!publisher) {
      toast.error("Please select a publisher");
      setIsSubmitting(false);
      return;
    }

    if (tags.length === 0) {
      toast.error("Please select at least one tag");
      setIsSubmitting(false);
      return;
    }

    const articleData = {
      title,
      image: uploadedImage,
      publisher: publisher.value,
      tags: tags.map((tag) => tag.value),
      description,
      status: "pending",
      authorEmail: user.email,
    };

try {
  const token = await user.getIdToken();  
  await axios.post(
    `${import.meta.env.VITE_API_URL}/articles`,
    articleData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  toast.success("Article added successfully! Pending for approval.");
  form.reset();
  setUploadedImage(null);
  setTags([]);
  setPublisher(null);
} catch (err) {
  if (err.response && err.response.status === 403) {
    toast.error(err.response.data.message || "Normal users can only publish 1 article.");
  } else {
    toast.error("Failed to add article");
  }
} finally {
  setIsSubmitting(false);
}
  };

  if (isLoading) return <p className="text-center mt-10">Loading publishers...</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-black"
            placeholder="Enter article title"
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Publisher</label>
          <Select
            options={publishers}
            value={publisher}
            onChange={setPublisher}
            placeholder="Select Publisher"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Tags</label>
          <Select
            isMulti
            options={tagsOptions}
            value={tags}
            onChange={setTags}
            placeholder="Select Tags"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleImageUpload}
              accept="image/*"
            />
            {uploadedImage && (
              <a
                href={uploadedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Image
              </a>
            )}
          </div>
          {imageUploadError && (
            <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="5"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-black"
            placeholder="Write article description..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00001A] text-white py-3 cursor-pointer rounded-md font-semibold hover:bg-[#11111f]"
        >
          {isSubmitting ? "Adding..." : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticles;
