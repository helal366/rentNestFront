"use client";

import React from "react";
import Link from "next/link";
//  CORRECT EXPORTS
import { Building2, Mail, Phone, MapPin, ArrowUpRight} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        {/* Upper Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Brand Info Statement */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2 text-white">
              <div className="p-2 bg-[#3E4A36] rounded-lg text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Rent<span className="text-olive-300">Nest</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-400">
              RentNest simplifies the rental ecosystem by establishing direct,
              secure connection pipelines between verified landlords and trusted
              tenants. Built with precision, clarity, and zero broker overheads.
            </p>
            {/* Social Links Subgroup */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="#"
                className="p-2 bg-neutral-900 hover:bg-[#3E4A36] hover:text-white rounded-md transition-colors text-neutral-400"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 bg-neutral-900 hover:bg-[#3E4A36] hover:text-white rounded-md transition-colors text-neutral-400"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="p-2 bg-neutral-900 hover:bg-[#3E4A36] hover:text-white rounded-md transition-colors text-neutral-400"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Actions */}
          <div className="md:col-span-2 space-y-4 text-left md:pl-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/properties"
                  className="hover:text-white transition-colors flex items-center gap-0.5 group"
                >
                  Browse Properties{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?rentStatus=AVAILABLE"
                  className="hover:text-white transition-colors flex items-center gap-0.5 group"
                >
                  Available Nests{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors flex items-center gap-0.5 group"
                >
                  Categories{" "}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Accountability Policies */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Office Contact Coordinates */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-olive-300 shrink-0 mt-0.5" />
                <span>Gulshan-2, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-olive-300 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-olive-300 shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer">
                  support@rentnest.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Section: Copyright and AES Architecture Attributions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
          <p>© {currentYear} RentNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AES-256 Encrypted Datastores
            </span>
            <span>v1.0.4-production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
