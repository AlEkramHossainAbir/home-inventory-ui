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

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: item, isLoading, error } = useItemDetail(id);
  const [activeTab, setActiveTab] = useState<"details" | "attachments" | "activity">("details");

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
              <p className="text-red-600 mb-4">Error loading item: {error?.message || "Item not found"}</p>
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

  const hasWarranty = item.lifetimeWarranty || (item.warrantyExpires && new Date(item.warrantyExpires) > new Date());

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/inventory" className="hover:text-gray-900">Inventory</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Paperclip className="w-4 h-4" />
                Add Attachment
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">{item.name}</h1>
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <span
                    key={label.id}
                    className="px-3 py-1 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: `${label.color === 'teal' ? '#14B8A6' : label.color === 'blue' ? '#3B82F6' : label.color}15`,
                      color: label.color === 'teal' ? '#14B8A6' : label.color === 'blue' ? '#3B82F6' : label.color,
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left: Image Gallery */}
              <div className="lg:col-span-2">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Image
                      src="/Home.svg"
                      alt=""
                      width={100}
                      height={100}
                      className="mx-auto opacity-50"
                    />
                    <p className="mt-4">No image available</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <button className="aspect-square border-2 border-blue-600 rounded-lg bg-white flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </button>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="aspect-square border border-gray-200 rounded-lg bg-white"></div>
                  ))}
                </div>
              </div>

              {/* Right: Key Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">{item.location.name}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Labels</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.labels.map((label) => (
                        <span
                          key={label.id}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `${label.color === 'teal' ? '#14B8A6' : label.color}15`,
                            color: label.color === 'teal' ? '#14B8A6' : label.color,
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Quantity</label>
                    <p className="text-gray-900 mt-1">{item.quantity}</p>
                  </div>

                  {item.purchaseTime && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Purchase Date</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">
                          {new Date(item.purchaseTime).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-500">Purchase Price</label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 text-lg font-semibold">
                        ${item.purchasePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {hasWarranty && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Warranty</label>
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          <Shield className="w-4 h-4" />
                          {item.lifetimeWarranty 
                            ? 'Lifetime Warranty' 
                            : `Active until ${item.warrantyExpires ? new Date(item.warrantyExpires).toLocaleDateString() : ''}`
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {item.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Notes</label>
                      <p className="text-sm text-gray-700 mt-1">{item.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
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

              <div className="p-6">
                {activeTab === "details" && (
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Information</h3>
                      <div className="space-y-3">
                        {item.manufacturer && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Brand</span>
                            <span className="text-sm font-medium text-gray-900">{item.manufacturer}</span>
                          </div>
                        )}
                        {item.modelNumber && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Model</span>
                            <span className="text-sm font-medium text-gray-900">{item.modelNumber}</span>
                          </div>
                        )}
                        {item.serialNumber && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Serial Number</span>
                            <span className="text-sm font-medium text-gray-900">{item.serialNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">Additional Details</h3>
                      <div className="space-y-3">
                        {item.assetId && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Asset ID</span>
                            <span className="text-sm font-medium text-gray-900">{item.assetId}</span>
                          </div>
                        )}
                        {item.purchaseFrom && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Purchased From</span>
                            <span className="text-sm font-medium text-gray-900">{item.purchaseFrom}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Updated</span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(item.updatedAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
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
                          <div key={attachment.id} className="border border-gray-200 rounded-lg p-4">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-900 truncate">{attachment.name}</p>
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
                    <p className="text-gray-500">No activity history available</p>
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
