import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import CarCard from "../components/CarCard";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const CAR_TYPES = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Truck",
  "Van",
];

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const fetchCars = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (type !== "All") params.type = type;
    axiosInstance
      .get("/api/cars", { params })
      .then((res) => setCars(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, [type]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">
          Our Fleet
        </span>
        <h1 className="font-heading text-5xl font-bold text-white mt-2">
          Explore All Cars
        </h1>
        <p className="text-gray-400 mt-3">
          Find the perfect ride for every journey
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car name..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none"
          />
          <button type="submit" className="btn-primary px-5 py-2.5">
            <FaSearch />
          </button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {CAR_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${type === t ? "bg-primary text-white" : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : cars.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No cars found. Try a different search.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </motion.div>
      )}
    </div>
  );
};
export default ExploreCars;
