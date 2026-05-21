import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaTrash, FaCar } from "react-icons/fa";
import { format } from "date-fns";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/bookings/my-bookings")
      .then((res) => setBookings(res.data))
      .catch(() => toast.error("Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    try {
      await axiosInstance.delete(`/api/bookings/${cancelId}`);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== cancelId));
      setCancelId(null);
    } catch {
      toast.error("Failed to cancel");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-white">
          My Bookings
        </h1>
        <p className="text-gray-400 mt-1">
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <FaCar className="text-primary text-5xl mx-auto mb-4 opacity-30" />
          <p className="text-gray-500">
            No bookings yet. Go explore some cars!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-glass rounded-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                <img
                  src={booking.carImage}
                  alt={booking.carName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {booking.carName}
                  </h3>
                  <p className="text-primary text-sm font-semibold">
                    {booking.carType}
                  </p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaMapMarkerAlt className="text-primary" />{" "}
                    {booking.pickupLocation}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Booked on:{" "}
                    {format(new Date(booking.bookingDate), "MMM dd, yyyy")}
                  </div>
                  {booking.specialNote && (
                    <div className="text-gray-400 text-xs italic">
                      Note: {booking.specialNote}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${booking.driverNeeded ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}
                    >
                      {booking.driverNeeded ? "Driver Included" : "Self Drive"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-3">
                  <div className="font-heading text-2xl font-bold text-white">
                    ${booking.dailyRentPrice}
                    <span className="text-gray-400 text-sm font-normal">
                      /day
                    </span>
                  </div>
                  <button
                    onClick={() => setCancelId(booking._id)}
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-colors"
                  >
                    <FaTrash size={12} /> Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cancel Confirm */}
      <AnimatePresence>
        {cancelId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setCancelId(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="card-glass w-full max-w-sm p-6 rounded-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-3">❌</div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Cancel Booking?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 btn-outline text-sm py-2"
                >
                  Keep It
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm font-semibold transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MyBookings;
