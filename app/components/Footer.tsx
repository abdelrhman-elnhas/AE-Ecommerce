import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Tagline */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">AE Store</h3>
                        <p className="text-sm text-slate-400">
                            "Let's Shop Beyond Boundaries"
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Youtube className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Column 1 */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">AE Store</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">All Categories</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>

                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Buy</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Bill & Top Up</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Partnerships</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Promo Code</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Help</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Return Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} AE Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
