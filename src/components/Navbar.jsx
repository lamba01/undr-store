"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

export default function Nav() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //   const [categories, setCategories] = useState([]);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const categories = [
    // { id: 1, title: "All Products", slug: "" },
    { id: 1, title: "Men", slug: "men" },
    { id: 2, title: "Lingerie", slug: "lingerie" },
    { id: 3, title: "Loungewear", slug: "loungewear" },
    { id: 4, title: "Chemise", slug: "chemise" },
    { id: 5, title: "Games", slug: "games" },
    { id: 6, title: "Essentials", slug: "essentials" },
    { id: 7, title: "Toys", slug: "toys" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/store?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2.5 text-xs tracking-widest relative z-50">
        New arrivals just dropped &nbsp;·&nbsp;
        <span className="text-[#c9a96e]">
          Free delivery on orders over ₦50,000
        </span>
        &nbsp;·&nbsp; Use code UNDR10 for 10% off
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <div className="max-w-350 mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="UNDR."
                width={120}
                height={40}
                //   style={{ width: "auto", height: "40px" }}
                className="object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-xs tracking-widest uppercase text-neutral-600 hover:text-black transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/store"
                className="text-xs tracking-widest uppercase text-neutral-600 hover:text-black transition-colors relative group"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center gap-1.5 text-xs cursor-pointer tracking-widest uppercase text-neutral-600 hover:text-black transition-colors"
                >
                  Categories
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`absolute top-full left-0 mt-3 w-52 bg-white border border-neutral-100 shadow-lg transition-all duration-200 ${
                    categoryOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <Link
                    href="/store"
                    onClick={() => setCategoryOpen(false)}
                    className="block px-5 py-3 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors border-b border-neutral-100"
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/store?category=${cat.slug}`}
                      onClick={() => setCategoryOpen(false)}
                      className="block px-5 py-3 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Login */}
              <Link
                href="/account"
                className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest uppercase text-neutral-600 hover:text-black transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="hidden lg:inline">Login</span>
              </Link>

              {/* Cart */}
              {/* <Link
                href="/cart"
                aria-label="Cart"
                className="relative text-neutral-600 hover:text-black transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link> */}
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative text-neutral-600 hover:text-black transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 border-t border-neutral-100 ${searchOpen ? "max-h-20" : "max-h-0"}`}
        >
          <form
            onSubmit={handleSearch}
            className="max-w-350 mx-auto px-6 lg:px-10 py-4 flex items-center gap-4"
          >
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 text-sm border-b border-neutral-300 focus:border-black outline-none pb-1.5 bg-transparent placeholder:text-neutral-400 tracking-wide transition-colors"
            />
            <button
              type="submit"
              className="text-xs tracking-widest uppercase text-black hover:text-neutral-600 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-neutral-400 hover:text-black transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-125" : "max-h-0"}`}
        >
          <nav className="flex flex-col border-t border-neutral-100 bg-white">
            <Link
              href="/"
              className="px-6 py-4 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 border-b border-neutral-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/store"
              className="px-6 py-4 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 border-b border-neutral-100"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>

            <button
              // onClick={() => setCategoryOpen(!categoryOpen)}
              onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
              className="px-6 py-4 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 border-b border-neutral-100 flex items-center justify-between"
            >
              Categories
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {mobileCategoryOpen && (
              <>
                <Link
                  href="/store"
                  className="px-10 py-3 text-xs tracking-widest uppercase text-neutral-500 hover:text-black hover:bg-neutral-50 border-b border-neutral-50"
                  onClick={() => {
                    setMenuOpen(false);
                    setMobileCategoryOpen(false);
                  }}
                >
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/store?category=${cat.slug}`}
                    className="relative z-10 block px-10 py-3 text-xs tracking-widest uppercase text-neutral-500 hover:text-black hover:bg-neutral-50 border-b border-neutral-50"
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileCategoryOpen(false);
                    }}
                  >
                    {cat.title}s
                  </Link>
                ))}
              </>
            )}

            <Link
              href="/account"
              className="px-6 py-4 text-xs tracking-widest uppercase text-neutral-600 hover:text-black hover:bg-neutral-50 border-b border-neutral-100"
              onClick={() => setMenuOpen(false)}
            >
              Login / Register
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
