import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-cyan-400">
              Discovery Engine
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              AI-powered personalized product recommendation and semantic
              search platform that helps users discover products smarter,
              faster, and more accurately.
            </p>

            <div className="flex gap-5 mt-8 text-2xl">

              <a href="#">
                <FaGithub className="hover:text-cyan-400 transition" />
              </a>

              <a href="#">
                <FaLinkedin className="hover:text-cyan-400 transition" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-cyan-400 transition" />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <a href="/" className="hover:text-cyan-400">
                  Home
                </a>
              </li>

              <li>
                <a href="/search" className="hover:text-cyan-400">
                  Search
                </a>
              </li>

              <li>
                <a href="/recommendations" className="hover:text-cyan-400">
                  Recommendations
                </a>
              </li>

              <li>
                <a href="/wishlist" className="hover:text-cyan-400">
                  Wishlist
                </a>
              </li>

              <li>
                <a href="/cart" className="hover:text-cyan-400">
                  Cart
                </a>
              </li>

            </ul>

          </div>

          {/* AI Features */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              AI Features
            </h3>

            <ul className="space-y-4">

              <li>🔍 Semantic Search</li>

              <li>🤖 AI Shopping Assistant</li>

              <li>❤️ Personalized Recommendations</li>

              <li>👕 Complete the Look</li>

              <li>🛒 Frequently Bought Together</li>

              <li>⚡ Session Intent Detection</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                support@discoveryengine.ai
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                +91 9876543210
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-cyan-400" />
                Bengaluru, India
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 Discovery Engine. All Rights Reserved.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0">

            <a href="#" className="hover:text-cyan-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-cyan-400">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-cyan-400">
              Support
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;