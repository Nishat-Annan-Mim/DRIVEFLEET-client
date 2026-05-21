import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUsers, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const CarCard = ({ car }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.3 }}
    className="card-glass overflow-hidden group"
  >
    <div className="relative overflow-hidden h-48">
      <img
        src={car.imageURL}
        alt={car.carName}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${car.availability ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
        >
          {car.availability ? "Available" : "Unavailable"}
        </span>
      </div>
      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
        ${car.dailyRentPrice}/day
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-white font-heading text-xl font-bold mb-1">
        {car.carName}
      </h3>
      <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">
        {car.carType}
      </p>
      <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
        <span className="flex items-center gap-1">
          <FaUsers /> {car.seatCapacity} seats
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt /> {car.pickupLocation}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs">
          {car.bookingCount || 0} bookings
        </span>
        <Link
          to={`/cars/${car._id}`}
          className="btn-primary text-xs py-1.5 px-4"
        >
          View Details
        </Link>
      </div>
    </div>
  </motion.div>
);
export default CarCard;
