import { useState } from "react";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Truck", "Van"];

const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    carName: "",
    dailyRentPrice: "",
    carType: "SUV",
    imageURL: "",
    seatCapacity: "",
    pickupLocation: "",
    description: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/api/cars", form);
      toast.success("Car listed successfully! 🚗");
      navigate("/my-cars");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-8 rounded-2xl"
      >
        <h1 className="font-heading text-4xl font-bold text-white mb-1">
          Add Your Car
        </h1>
        <p className="text-gray-400 text-sm mb-7">
          List your vehicle and start earning today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              name: "carName",
              label: "Car Name",
              type: "text",
              placeholder: "e.g. Toyota RAV4",
            },
            {
              name: "dailyRentPrice",
              label: "Daily Rent Price ($)",
              type: "number",
              placeholder: "50",
            },
            {
              name: "imageURL",
              label: "Image URL",
              type: "url",
              placeholder: "https://...",
            },
            {
              name: "seatCapacity",
              label: "Seat Capacity",
              type: "number",
              placeholder: "5",
            },
            {
              name: "pickupLocation",
              label: "Pickup Location",
              type: "text",
              placeholder: "Dhaka, Bangladesh",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-gray-300 text-sm block mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="text-gray-300 text-sm block mb-1">Car Type</label>
            <select
              name="carType"
              value={form.carType}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none"
            >
              {CAR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your car..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-3 p-3 card-glass rounded-xl">
            <input
              type="checkbox"
              name="availability"
              id="availability"
              checked={form.availability}
              onChange={handleChange}
              className="accent-primary w-4 h-4"
            />
            <label htmlFor="availability" className="text-gray-300 text-sm">
              Available for booking
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-base disabled:opacity-50"
          >
            {loading ? "Adding Car..." : "Add Car Listing"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default AddCar;
