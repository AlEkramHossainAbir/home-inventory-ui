"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  MoreVertical,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: "/dashboard.svg", label: "Dashboard", href: "/dashboard" },
  { icon: "/inventory.svg", label: "Inventory", href: "/inventory" },
  { icon: "/locations.svg", label: "Locations", href: "/locations" },
  { icon: "/labels.svg", label: "Labels", href: "/labels" },
  { icon: "/receipts.svg", label: "Receipts", href: "/receipts" },
  { icon: "/settings.svg", label: "Settings", href: "/settings" },
  { icon: "/user.svg", label: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    // Load user data from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserData(user);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('attachmentToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
    
    // Redirect to login
    router.push('/');
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (userData?.username) {
      return userData.username.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const displayName = userData?.name || userData?.username || 'User';
  const displayEmail = userData?.email || userData?.username || 'user@example.com';

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo and App Name */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 btn-primary rounded-xl">
            <Image
              src="/Home.svg"
              alt="Home Inventory"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Home Inventory
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    style={{
                      filter: isActive 
                        ? 'invert(45%) sepia(98%) saturate(1853%) hue-rotate(201deg) brightness(100%) contrast(93%)'
                        : 'invert(36%) sepia(11%) saturate(896%) hue-rotate(181deg) brightness(96%) contrast(91%)'
                    }}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 relative">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {getInitials()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Smith
            </p>
            <p className="text-xs text-gray-500 truncate">
              john.smith@example.com
            </p>
          </div>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="User menu"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              
              {/* Dropdown content */}
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
