import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdElectricCar } from "react-icons/md";
import CarCard from "../components/CarCard";
import Spinner from "../components/Spinner";
import axiosInstance from "../utils/axios";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/api/cars")
      .then((res) => setCars(res.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-16">
      {/* BANNER */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600"
            alt="hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Premium Car Rental Service
            </span>
            <h1 className="font-heading text-6xl md:text-8xl font-bold text-white leading-tight mb-4">
              DRIVE YOUR <span className="text-primary">DREAM</span> CAR
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Experience the road like never before. Choose from our premium
              fleet of vehicles at unbeatable daily rates.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/cars" className="btn-primary text-base px-8 py-3">
                Explore Cars
              </Link>
              {user ? (
                <Link to="/cars" className="btn-outline text-base px-8 py-3">
                  View All Cars
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="btn-outline text-base px-8 py-3"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto"
          >
            {[
              ["500+", "Cars Available"],
              ["10K+", "Happy Clients"],
              ["50+", "Cities Covered"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="card-glass p-4 rounded-xl text-center"
              >
                <div className="font-heading text-2xl font-bold text-primary">
                  {num}
                </div>
                <div className="text-gray-400 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AVAILABLE CARS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Our Fleet
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            Available Cars
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Hand-picked vehicles for every occasion — from city commutes to
            luxury getaways.
          </p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/cars" className="btn-outline px-8 py-3">
                View All Cars
              </Link>
            </div>
          </>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#080808] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Why DriveFleet
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
              The DriveFleet Advantage
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaShieldAlt,
                title: "Fully Insured",
                desc: "Every vehicle comes with comprehensive insurance coverage for your peace of mind.",
              },
              {
                icon: FaClock,
                title: "24/7 Available",
                desc: "Book any time, day or night. Our platform never sleeps.",
              },
              {
                icon: FaHeadset,
                title: "Live Support",
                desc: "Our support team is always ready to assist you throughout your journey.",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Nationwide",
                desc: "Pick up and drop off at over 50 locations across the country.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                className="card-glass p-6 rounded-2xl text-center"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Simple Process
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Choose Your Car",
              desc: "Browse our extensive fleet and find the perfect car for your needs and budget.",
            },
            {
              step: "02",
              title: "Book Instantly",
              desc: "Complete your booking in minutes with our streamlined reservation system.",
            },
            {
              step: "03",
              title: "Hit the Road",
              desc: "Pick up your car and enjoy the ride. Return it when you're done — hassle free.",
            },
          ].map(({ step, title, desc }) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative card-glass p-8 rounded-2xl"
            >
              <div className="font-heading text-6xl font-bold text-primary/10 absolute top-4 right-6">
                {step}
              </div>
              <div className="font-heading text-lg font-bold text-primary mb-2">
                Step {step}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 border-y border-primary/20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <MdElectricCar className="text-primary text-5xl mx-auto mb-4" />
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of happy drivers. Sign up today and get your first
            ride at a special rate.
          </p>
          <Link to="/cars" className="btn-primary text-base px-10 py-3">
            Browse Cars Now
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
