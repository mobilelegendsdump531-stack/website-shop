'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">
              Shop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your one-stop shop for digital and physical products with secure payments and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-cyan transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2024 Shop Website. All rights reserved. Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
