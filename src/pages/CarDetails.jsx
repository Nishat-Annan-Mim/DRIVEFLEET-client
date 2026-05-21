import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Spinner from "../components/Spinner";
import BookingModal from "../components/BookingModal";
import useAuth from "../hooks/useAuth";
import { FaUsers, FaMapMarkerAlt, FaTag, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => toast.error("Car not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!car)
    return (
      <div className="text-center pt-32 text-gray-400">Car not found.</div>
    );

  const handleBookClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Image */}
        <div className="rounded-2xl overflow-hidden h-80 lg:h-auto">
          <img
            src={car.imageURL}
            alt={car.carName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${car.availability ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
            >
              {car.availability ? "Available" : "Unavailable"}
            </span>
            <h1 className="font-heading text-4xl font-bold text-white mt-3">
              {car.carName}
            </h1>
            <p className="text-primary font-semibold text-lg">{car.carType}</p>
          </div>

          <div className="text-4xl font-heading font-bold text-white">
            ${car.dailyRentPrice}{" "}
            <span className="text-gray-400 text-lg font-normal">/day</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FaUsers, label: "Seats", value: car.seatCapacity },
              {
                icon: FaMapMarkerAlt,
                label: "Pickup",
                value: car.pickupLocation,
              },
              {
                icon: FaCalendarAlt,
                label: "Bookings",
                value: car.bookingCount || 0,
              },
              { icon: FaTag, label: "Type", value: car.carType },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="card-glass p-3 rounded-xl flex items-center gap-3"
              >
                <Icon className="text-primary" />
                <div>
                  <div className="text-gray-500 text-xs">{label}</div>
                  <div className="text-white text-sm font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-glass p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Description</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {car.description}
            </p>
          </div>

          <div className="text-gray-500 text-xs">
            Listed by: {car.ownerName || car.ownerEmail}
          </div>

          <button
            onClick={handleBookClick}
            disabled={!car.availability}
            className="w-full btn-primary py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {car.availability ? "Book Now" : "Not Available"}
          </button>
        </div>
      </motion.div>

      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
export default CarDetails;
