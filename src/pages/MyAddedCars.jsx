import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const CAR_TYPES = ["SUV", "Sedan", "Hatchback", "Luxury", "Truck", "Van"];

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchCars = () => {
    axiosInstance
      .get("/api/cars/my-cars")
      .then((res) => setCars(res.data))
      .catch(() => toast.error("Failed to load cars"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/cars/${deleteId}`);
      toast.success("Car deleted");
      setCars((prev) => prev.filter((c) => c._id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axiosInstance.put(`/api/cars/${editCar._id}`, editCar);
      toast.success("Car updated!");
      setCars((prev) =>
        prev.map((c) => (c._id === editCar._id ? res.data : c)),
      );
      setEditCar(null);
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-white">
          My Added Cars
        </h1>
        <p className="text-gray-400 mt-1">
          {cars.length} listing{cars.length !== 1 ? "s" : ""}
        </p>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          You haven't added any cars yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              layout
              className="card-glass rounded-2xl overflow-hidden"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={car.imageURL}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-xl font-bold text-white">
                  {car.carName}
                </h3>
                <p className="text-primary text-sm font-semibold">
                  {car.carType}
                </p>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <span className="text-white font-bold">
                    ${car.dailyRentPrice}/day
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${car.availability ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {car.availability ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditCar({ ...car })}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 py-2 rounded-xl text-sm hover:bg-blue-500/20 transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(car._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editCar && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setEditCar(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="card-glass w-full max-w-lg p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-heading text-2xl font-bold text-white">
                  Update Car
                </h2>
                <button
                  onClick={() => setEditCar(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                {[
                  { name: "carName", label: "Car Name", type: "text" },
                  {
                    name: "dailyRentPrice",
                    label: "Daily Price ($)",
                    type: "number",
                  },
                  { name: "imageURL", label: "Image URL", type: "url" },
                  {
                    name: "pickupLocation",
                    label: "Pickup Location",
                    type: "text",
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-gray-300 text-sm block mb-1">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={editCar[f.name]}
                      onChange={(e) =>
                        setEditCar({ ...editCar, [f.name]: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-300 text-sm block mb-1">
                    Car Type
                  </label>
                  <select
                    value={editCar.carType}
                    onChange={(e) =>
                      setEditCar({ ...editCar, carType: e.target.value })
                    }
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
                    value={editCar.description}
                    onChange={(e) =>
                      setEditCar({ ...editCar, description: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-primary focus:outline-none resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="avail"
                    checked={editCar.availability}
                    onChange={(e) =>
                      setEditCar({ ...editCar, availability: e.target.checked })
                    }
                    className="accent-primary w-4 h-4"
                  />
                  <label htmlFor="avail" className="text-gray-300 text-sm">
                    Available
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditCar(null)}
                    className="flex-1 btn-outline text-sm py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 btn-primary text-sm py-2 disabled:opacity-50"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="card-glass w-full max-w-sm p-6 rounded-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Delete Car?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                This action cannot be undone. The listing will be permanently
                removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 btn-outline text-sm py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MyAddedCars;
