import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => (
  <footer className="bg-[#080808] border-t border-white/10 pt-12 pb-6 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FaCar className="text-primary text-xl" />
          <span className="text-white font-heading text-xl font-bold">
            DRIVE<span className="text-primary">FLEET</span>
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Premium car rental service. Drive your dream car today with unbeatable
          prices and top-tier service.
        </p>
      </div>
      <div>
        <h4 className="text-white font-heading text-lg mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          {[
            ["/", "Home"],
            ["/cars", "Explore Cars"],
            ["/add-car", "Add Car"],
            ["/my-bookings", "My Bookings"],
          ].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="hover:text-primary transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-heading text-lg mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>📍 Dhaka, Bangladesh</li>
          <li>📞 +880 1700-000000</li>
          <li>✉️ support@drivefleet.com</li>
          <li>🕐 Mon–Sat: 9am – 6pm</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-heading text-lg mb-3">Follow Us</h4>
        <div className="flex gap-3 mt-2">
          {[FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:border-primary hover:text-primary transition-all"
              >
                <Icon size={15} />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
      © 2025 DriveFleet. All rights reserved.
    </div>
  </footer>
);
export default Footer;
