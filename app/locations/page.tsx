"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  Search,
  Plus,
  Home,
  ChevronRight,
  Pencil,
  Trash2,
  Bell,
  HelpCircle,
} from "lucide-react";
import { useLocations } from "@/hooks/useLocations";
import { type LocationItem } from "@/types/location";
import Image from "next/image";

export default function LocationsPage() {
  const { data: locations, isLoading, error } = useLocations();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(
    null
  );

  // Filter locations based on search
  const filteredLocations = locations?.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Select first location by default when data loads
  if (locations && locations.length > 0 && !selectedLocation) {
    setSelectedLocation(locations[0]);
  }

  // Mock data for items in location (since API doesn't provide this yet)
  const mockLocationItems = [
    {
      id: "1",
      name: "Vintage Camera Collection",
      category: "Electronics",
      price: 180,
      condition: "Good" as const,
      addedAt: "2 weeks ago",
    },
    {
      id: "2",
      name: "Book Collection",
      category: "Books",
      price: 65,
      condition: "Good" as const,
      addedAt: "1 month ago",
    },
  ];

  const getLocationIcon = (locationName: string) => {
    const name = locationName.toLowerCase();
    if (name.includes("home") || name.includes("living")) return "🏠";
    if (name.includes("garage")) return "🚗";
    if (
      name.includes("storage") ||
      name.includes("attic") ||
      name.includes("basement")
    )
      return "📦";
    if (name.includes("kitchen")) return "🍳";
    if (name.includes("bedroom")) return "🛏️";
    if (name.includes("bathroom")) return "🚿";
    if (name.includes("office")) return "💼";
    return "📍";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-[#0F172A]">
                Locations
              </h1>
              <p className="text-sm font-normal text-[#64748B]">
                Organize your items by location
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image
                  src="/bell.svg"
                  alt=""
                  width={12}
                  height={12}
                  className="w-4.5 h-4.5"
                />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Image
                  src="/question.svg"
                  alt=""
                  width={12}
                  height={12}
                  className="w-4.5 h-4.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Locations List */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            <div className="space-y-3">
              {/* Search Box */}
              <div className="px-4 pt-4 pb-1">
                <div className="relative">
                  <Image
                    src="/search.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  />

                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 font-normal text-[#9CA3AF] placeholder:text-[#9CA3AF]  placeholder:font-normal placeholder:text-[16px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* New Location Button */}
              <div className="p-4 border-t border-b border-[#E2E8F0]">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white bg-[#3B82F6] rounded-lg shadow-[0px_1px_2px_0px_#0000000D] hover:bg-blue-700 transition-colors text-sm font-medium">
                  <Image
                    src="/plus.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="w-3.5 h-3.5"
                  />
                  New Location
                </button>
              </div>
            </div>

            {/* Locations List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading && (
                <div className="p-4 text-center text-gray-500">
                  Loading locations...
                </div>
              )}

              {error && (
                <div className="p-4 text-center text-red-500">
                  Error loading locations: {error.message}
                </div>
              )}

              {filteredLocations && filteredLocations.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No locations found
                </div>
              )}

              {filteredLocations && filteredLocations.length > 0 && (
                <div className="space-y-1 p-4">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full flex items-center gap-2 py-2 pr-3 pl-8 rounded-lg transition-colors text-left ${
                        selectedLocation?.id === location.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-xl">
                        {getLocationIcon(location.name)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#0F172A] truncate">
                          {location.name}
                        </div>
                      </div>
                      <span
                        className={`text-xs font-normal text-[#64748B] ${
                          selectedLocation?.id === location.id
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {location.itemCount}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Location Details */}
          <div className="flex-1 overflow-y-auto p-8">
            {!selectedLocation && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  Select a location to view details
                </p>
              </div>
            )}

            {selectedLocation && (
              <div className="max-w-4xl">
                {/* Location Header */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">
                          {getLocationIcon(selectedLocation.name)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                          {selectedLocation.name}
                        </h2>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Home className="w-4 h-4" />
                          <span>Home</span>
                          <ChevronRight className="w-3 h-3" />
                          <span>Living Room</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 text-blue-600 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                        <Plus className="w-4 h-4" />
                        Add Child
                      </button>
                      <button className="flex items-center gap-2 px-3 py-1.5 text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-sm">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-700">
                      {selectedLocation.description ||
                        "White wooden bookshelf in the living room containing books, decorations, and collectibles. Located next to the window."}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Items
                      </div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {selectedLocation.itemCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Total Value
                      </div>
                      <div className="text-2xl font-semibold text-gray-900">
                        ${(selectedLocation.itemCount * 122.5).toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Created
                      </div>
                      <div className="text-sm text-gray-900">
                        {new Date(
                          selectedLocation.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items in this Location */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Items in this Location
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All →
                    </button>
                  </div>

                  {selectedLocation.itemCount === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No items in this location yet
                      </p>
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Add Item to this Location
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {mockLocationItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">📷</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.category} • Added {item.addedAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-900">
                                ${item.price}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                {item.condition}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Add Item to this Location
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
