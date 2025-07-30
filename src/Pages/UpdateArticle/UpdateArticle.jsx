import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Select from "react-select";
import axios from "axios";
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";

const tagsOptions = [
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "economy", label: "Economoy" },
  { value: "science", label: "Science" },
  { value: "buisness", label: "Buisness" },
  { value: "lifestyle", label: "Life Style" },
  { value: "Religion", label: "Religion" },
];

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [publisherOptions, setPublisherOptions] = useState([]); // dynamic publishers
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Load publishers dynamically
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/publishers`)
      .then((res) => {
        const formatted = res.data.map((pub) => ({
          value: pub.name,
          label: pub.name,
        }));
        setPublisherOptions(formatted);
      })
      .catch(() => toast.error("Failed to load publishers"));
  }, []);

  // Load article data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/myarticles/${id}`) // changed route
      .then((res) => {
        const data = res.data;
        if (!data) return toast.error("Article not found");

        setFormData({
          title: data.title || "",
          description: data.description || "",
        });

        setUploadedImage(data.image || "");
        setPublisher({ value: data.publisher, label: data.publisher });
        setTags(tagsOptions.filter((tag) => data.tags?.includes(tag.value)));
      })
      .catch(() => toast.error("Failed to load article"));
  }, [id]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    try {
      const imageUrl = await imageUpload(image);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image upload failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    const updatedData = {
      ...formData,
      image: uploadedImage,
      publisher: publisher.value,
      tags: tags.map((tag) => tag.value),
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/myarticles/${id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Article updated successfully");
        navigate("/myarticles");
      } else {
        toast("No changes were made");
      }
    } catch (err) {
      toast.error("Failed to update article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-black"
            placeholder="Enter article title"
          />
        </div>

        {/* Publisher */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Publisher
          </label>
          <Select
            options={publisherOptions}
            value={publisher}
            onChange={setPublisher}
            placeholder="Select Publisher"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tags
          </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image
          </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          {isSubmitting ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
