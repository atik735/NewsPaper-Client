import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user profile
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user?email=${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setFormData(res.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load profile");
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageURL = await imageUpload(file);
      setFormData((prev) => ({ ...prev, image: imageURL }));
    } catch {
      toast.error("Image upload failed");
    }
  };

const handleUpdate = async e => {
  e.preventDefault();
  const { _id, ...updatePayload } = formData;  // _id বাদ
  try {
    const res = await axios.patch(
      `http://localhost:5000/user/profile/${_id}`,
      updatePayload
    );
    if (res.data.modifiedCount > 0) {
      toast.success("Profile updated!");
      setProfile({ ...profile, ...updatePayload });
      setEditing(false);
    } else {
      toast("No changes made");
    }
  } catch (err) {
    toast.error("Failed to update profile");
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      {!editing ? (
        <div className="space-y-4 text-center">
          <img
            src={profile?.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-black cursor-pointer text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-4 py-2 rounded"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-24 h-24 rounded-full mt-2"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
