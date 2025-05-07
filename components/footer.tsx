import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/app_icon.png" 
                alt="vocihub Logo"
                width={220}
                height={220}
                className="object-contain -ml-6 sm:ml-0 -mt-6 sm:mt-0"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted platform for game vouchers and digital products. We provide secure, instant, and reliable services for all your gaming needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#f77a0e] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#f77a0e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#f77a0e] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#f77a0e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#f77a0e] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#f77a0e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:admin@vocihub.com"
                  className="text-gray-600 hover:text-[#f77a0e] transition-colors flex items-center gap-3 group"
                >
                  <Mail className="w-5 h-5 text-[#f77a0e] group-hover:scale-110 transition-transform" />
                  admin@vocihub.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6285811959392"
                  className="text-gray-600 hover:text-[#f77a0e] transition-colors flex items-center gap-3 group"
                >
                  <Phone className="w-5 h-5 text-[#f77a0e] group-hover:scale-110 transition-transform" />
                  085811959392
                </a>
              </li>
            </ul>
          </div>

          {/* Office Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Office Location</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#f77a0e] mt-1" />
              <p className="text-gray-600 text-sm leading-relaxed">
                Gedung Is Plaza Lt. 5,<br />
                Jl Pramuka Kav 150,<br />
                Utan Kayu Utara,<br />
                Matraman,<br />
                Jakarta Timur 13120
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} PT GENGGAM TEKNOLOGI ASIA. All rights reserved.
            </p>
          </div>
        </div>
      </div>


    </footer>
  );
}
