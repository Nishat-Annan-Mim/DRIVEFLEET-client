import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4 text-center">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="font-heading text-[120px] font-bold text-primary/20 leading-none">
        404
      </div>
      <h1 className="font-heading text-4xl font-bold text-white mt-2 mb-3">
        Page Not Found
      </h1>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Looks like you took a wrong turn. The page you're looking for doesn't
        exist or has been moved.
      </p>
      <Link to="/" className="btn-primary px-8 py-3">
        Back to Home
      </Link>
    </motion.div>
  </div>
);
export default NotFound;
