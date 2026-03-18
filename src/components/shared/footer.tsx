import * as React from "react";
import Link from "next/link";
import { Laptop } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <Laptop className="h-6 w-6 text-indigo-500" />
              <span className="text-xl font-bold tracking-tight">SoftwareLelo</span>
            </Link>
            <p className="text-sm">
              Your trusted partner for 100% genuine software keys and licenses at unbeatable prices.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Operating Systems</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Office Productivity</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Antivirus & Security</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Developer Tools</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Activation Guide</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Refund Policy</Link></li>
              <li className="flex items-center mt-4">
                <span className="bg-emerald-500/10 text-emerald-400 py-1 px-3 rounded-full text-xs font-medium border border-emerald-500/20">
                  16/7 Live Support
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm md:flex md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} SoftwareLelo. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 md:mt-0">
            {/* Social Icons Placeholder */}
            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">Twitter</span>
            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">GitHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
