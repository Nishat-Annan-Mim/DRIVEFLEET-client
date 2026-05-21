import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ car, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(`/api/bookings/${car._id}`, {
        driverNeeded,
        specialNote,
      });
      toast.success("Car booked successfully! 🎉");
      onClose();
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="card-glass w-full max-w-md p-6 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-heading text-2xl text-white font-bold mb-1">
            Book This Car
          </h2>
          <p className="text-primary font-semibold mb-5">
            {car.carName} — ${car.dailyRentPrice}/day
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gray-300 text-sm">Driver Needed?</span>
              <button
                onClick={() => setDriverNeeded(!driverNeeded)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${driverNeeded ? "bg-primary" : "bg-gray-600"} relative`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${driverNeeded ? "left-7" : "left-1"}`}
                />
              </button>
            </div>

            <div>
              <label className="text-gray-300 text-sm block mb-1">
                Special Note
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Any special requests..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 btn-outline text-sm py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={loading}
                className="flex-1 btn-primary text-sm py-2 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default BookingModal;
