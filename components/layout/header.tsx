"use client";

import { Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartSidebar from "../cart/cart-sidebar";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Accueil", href: "/" },
  {
    name: "Catalogue",
    href: "/collections",
  },
  { name: "Contact", href: "/contact", icon: ShoppingCart },
];

const Header = () => {
  const pathname = usePathname();

  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeNav, setActiveNav] = useState("Accueil");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const bannerHeight = 48;

      if (currentScrollY <= bannerHeight) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);

        if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          setHeaderVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down - hide header
          setHeaderVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header
        className={`bg-[#1f1f21] border-b border-white/25 shadow-md shadow-black/30 backdrop-blur-md px-7.5 py-2.5 md:px-12.5 md:py-5 top-0 left-0 right-0 transition-transform duration-300${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }
        ${isAtTop ? "" : "fixed z-50"}
        `}
      >
        <div className="grid grid-cols-3 items-center">
          <div className="md:hidden flex items-center">
            {/* Desktop menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`text-[#E8E8E8] focus:outline-none ${
                mobileMenuOpen ? "hidden" : "flex"
              }`}
            >
              <Menu className="w-7 h-7" />
            </button>
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`text-[#E8E8E8] focus:outline-none ${
                mobileMenuOpen ? "flex" : "hidden"
              }`}
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-[#E8E8E8BF] text-base font-medium relative hover:text-[#E8E8E8] hover:after:absolute hover:after:bottom-[-3px] hover:after:left-0 hover:after:w-full hover:after:h-[1px] hover:after:bg-[#E8E8E8]
                ${
                  isActive
                    ? "text-[#E8E8E8] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[1px] after:bg-[#E8E8E8]"
                    : ""
                }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="text-[#E8E8E8] font-heading text-2xl font-bold uppercase text-center">
            CarbonFit
          </div>
          <div className="flex items-center justify-end space-x-4">
            <Search className="w-6 h-6 text-[#E8E8E8] hover:scale-110 cursor-pointer" />
            <button
              className="relative text-[#E8E8E8] hover:scale-110 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-6 h-7" />
              {totalItems > 0 && (
                <Badge className="absolute -bottom-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-[#d4a952] text-white text-xs font-bold">
                  {totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1f1f21] z-40 md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-[20px] py-[20px] border-b border-[#333]">
              <button
                onClick={toggleMobileMenu}
                className="text-[#E8E8E8] focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-[#E8E8E8] font-heading text-xl font-bold">
                RACER
              </div>
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-[#E8E8E8BF]" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#E8E8E8BF]" />
                  <span className="absolute -top-2 -right-2 bg-[rgb(236,193,116)] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    0
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex flex-col py-7.5">
              <Link
                href="#"
                onClick={() => handleNavClick("Acceuil")}
                className={`text-[#E8E8E8] text-lg font-medium transition-all duration-200 px-7.5 py-3 ${
                  activeNav === "Acceuil" ? "bg-[#333335]" : ""
                }`}
              >
                Acceuil
              </Link>
              <Link
                href="#"
                onClick={() => handleNavClick("Catalogue")}
                className={`text-[#E8E8E8] text-lg font-medium transition-all duration-200 px-7.5 py-3 ${
                  activeNav === "Catalogue" ? "bg-[#333335]" : ""
                }`}
              >
                Catalogue
              </Link>
              <Link
                href="#"
                onClick={() => handleNavClick("Contact")}
                className={`text-[#E8E8E8] text-lg font-medium transition-all duration-200 px-7.5 py-3 ${
                  activeNav === "Contact" ? "bg-[#333335]" : ""
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
