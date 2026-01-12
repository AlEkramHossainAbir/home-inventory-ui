"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useItemDetail } from "@/hooks/useItemDetail";
import {
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  FileText,
  Edit,
  Paperclip,
  Trash2,
  Activity,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: item, isLoading, error } = useItemDetail(id);
  const [activeTab, setActiveTab] = useState<
    "details" | "attachments" | "activity"
  >("details");

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading item details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">
                Error loading item: {error?.message || "Item not found"}
              </p>
              <button
                onClick={() => router.push("/inventory")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Inventory
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const hasWarranty =
    item.lifetimeWarranty ||
    (item.warrantyExpires && new Date(item.warrantyExpires) > new Date());

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link
                href="/inventory"
                className="text-[#64748B] text-sm hover:text-gray-900"
              >
                Inventory
              </Link>
              <Image
                src="/chevron-right.svg"
                alt=""
                width={16}
                height={16}
                className="w-3 h-3"
              />
              <span className="text-[#0F172A] text-sm font-medium">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm text-gray-700 border border-[#CBD5E1] rounded-lg hover:bg-gray-50 transition-colors">
                <Image
                  src="/pen.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-3 h-3"
                />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm text-[#334155] border border-[#CBD5E1]  rounded-lg hover:bg-gray-50 transition-colors">
                <Image
                  src="/attachment.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-3 h-3"
                />
                <span className="hidden md:inline">Add Attachment</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm text-[#EF4444] border border-[#FECACA] rounded-lg hover:bg-red-100 transition-colors">
                <Image
                  src="/trash.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-3 h-3"
                />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
                {item.name}
              </h1>
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <span
                    key={label.id}
                    className="px-3 py-1 rounded-[9999px] text-xs font-medium"
                    style={{
                      backgroundColor: `${
                        label.color === "teal"
                          ? "#DCFCE7"
                          : label.color === "blue"
                          ? "#DBEAFE"
                          : label.color
                      }15`,
                      color:
                        label.color === "teal"
                          ? "#15803D"
                          : label.color === "blue"
                          ? "#1D4ED8"
                          : label.color,
                    }}
                  >
                    {label.name}
                  </span>
                ))}
                {hasWarranty && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    Active Warranty
                  </span>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Left: Image Gallery */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg h-64 sm:h-96 lg:h-full w-full p-4 sm:p-6 border border-[#E2E8F0] relative overflow-visible">
                  <div className="w-full h-full bg-[#F1F5F9]"></div>
                  <div className="grid grid-cols-4 gap-2 absolute -bottom-4 left-6 right-6">
                    
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square border border-gray-200 rounded-lg bg-transparent"
                      ></div>
                    ))}
                    <button className="aspect-square border-2 border-blue-600 rounded-lg bg-transparent flex items-center justify-center">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Key Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Image
                        src="/map.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        />
                      <span className="text-gray-900">
                        {item.location.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Labels
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-2 py-1 rounded-[9999px] text-xs font-medium"
                          style={{
                            backgroundColor: `${
                              label.color === "teal" ? "#14B8A6" : label.color
                            }15`,
                            color:
                              label.color === "teal" ? "#14B8A6" : label.color,
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Quantity
                    </label>
                    <p className="text-gray-900 mt-1">{item.quantity}</p>
                  </div>

                  {item.purchaseTime && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Purchase Date
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Image 
                          src="/calendar.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-900">
                          {new Date(item.purchaseTime).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Purchase Price
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-900 text-lg font-semibold">
                        ${item.purchasePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {hasWarranty && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Warranty
                      </label>
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          <Shield className="w-4 h-4" />
                          {item.lifetimeWarranty
                            ? "Lifetime Warranty"
                            : `Active until ${
                                item.warrantyExpires
                                  ? new Date(
                                      item.warrantyExpires
                                    ).toLocaleDateString()
                                  : ""
                              }`}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Notes
                      </label>
                      <p className="text-sm text-gray-700 mt-1">{item.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "details"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab("attachments")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "attachments"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Attachments
                    {item.attachments && item.attachments.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                        {item.attachments.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "activity"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Activity
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {activeTab === "details" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Product Information
                      </h3>
                      <div className="space-y-3">
                        {item.manufacturer && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Brand</span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.manufacturer}
                            </span>
                          </div>
                        )}
                        {item.modelNumber && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model</span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.modelNumber}
                            </span>
                          </div>
                        )}
                        {item.serialNumber && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Serial Number
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.serialNumber}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Additional Details
                      </h3>
                      <div className="space-y-3">
                        {item.assetId && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Asset ID
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.assetId}
                            </span>
                          </div>
                        )}
                        {item.purchaseFrom && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Purchased From
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {item.purchaseFrom}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Last Updated
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(item.updatedAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "attachments" && (
                  <div className="text-center py-8">
                    {item.attachments && item.attachments.length > 0 ? (
                      <div className="grid grid-cols-4 gap-4">
                        {item.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-900 truncate">
                              {attachment.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <Paperclip className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">No attachments yet</p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Add Attachment
                        </button>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "activity" && (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No activity history available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
