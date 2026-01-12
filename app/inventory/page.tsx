"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";
import { dummyInventoryData } from "@/lib/data/dummyInventory";

export default function InventoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const { items, total, pageSize } = dummyInventoryData;
  const totalPages = Math.ceil(total / pageSize);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Inventory</h1>
              <div className="relative flex-1 max-w-md w-full sm:w-auto">
                <Image
                  src="/search.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"
                />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-md h-11.5 opacity-100 rounded-lg px-3 pr-4 pl-11 font-normal text-base text-[#9CA3AF] placeholder:text-[#9CA3AF]
                            placeholder:font-normal placeholder:text-[16px] border border-[#CBD5E1] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 py-[10px] px-3 sm:px-[16px] text-sm sm:text-base text-[#334155] bg-white border border-[#CBD5E1] rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Image
                  src="/export.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 opacity-100 py-[10px] px-4 sm:px-[20px] text-sm sm:text-base text-white bg-[#3B82F6] rounded-lg hover:bg-blue-700 cursor-pointer shadow-[0px_1px_2px_0px_#0000000D] transition-colors whitespace-nowrap">
                <Image
                  src="/plus.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-6 md:px-8 py-4 bg-white border-b border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#334155]">
                Filters:
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFF6FF] text-[#3B82F6] rounded-lg text-sm font-medium">
                  All Locations
                  <button className="hover:bg-blue-100 rounded p-0.5">
                    <Image
                      src="/cross.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-3 h-3"
                    />
                  </button>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFF6FF] text-[#3B82F6] rounded-lg text-sm font-medium">
                  In Stock
                  <button className="hover:bg-blue-100 rounded p-0.5">
                    <Image
                      src="/cross.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-3 h-3"
                    />
                  </button>
                </span>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#CBD5E1] text-[#334155] rounded-lg text-sm font-medium hover:bg-gray-50">
                  <Image
                    src="/add-filter.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-3.5 h-3.5"
                  />
                  Add Filter
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 font-normal text-sm ">
              <span className="text-[#475569]">{total} items</span>
              <button className="flex items-center border border-[#CBD5E1] px-3 py-1.5 rounded-lg hover:bg-gray-50 gap-2">
                <Image
                  src="/sort.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-[#334155]">Sort: Updated</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-4 sm:p-6 md:p-8 bg-white">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === items.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                      style={{ accentColor: "#3B82F6" }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    ITEM
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    Labels
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#334155] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => {
                      // Don't navigate if clicking on checkbox, action menu, or links
                      if (
                        (e.target as HTMLElement).closest('input[type="checkbox"]') ||
                        (e.target as HTMLElement).closest('button') ||
                        (e.target as HTMLElement).closest('a')
                      ) {
                        return;
                      }
                      router.push(`/inventory/${item.id}`);
                    }}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) =>
                          handleSelectItem(item.id, e.target.checked)
                        }
                        className="w-4 h-4 rounded-[3px] border border-[#767676]"
                        style={{ accentColor: "#3B82F6" }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                          <Image
                            src="/table-item.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-12 h-12"
                          />
                        </div>
                        <div>
                          <div
                            className="text-base font-medium tracking-normal align-middle text-[#0F172A]"
                          >
                            {item.name}
                          </div>
                          <p className="font-normal text-[14px] text-[#64748B] align-middle">
                            Model: {item.assetId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#475569] font-normal">
                        {item.location.name.split(">").map((part, index) => (
                          <div
                            className="flex items-center gap-1.5"
                            key={index}
                          >
                            {index > 0 && (
                              <div className="flex text-[#475569] text-sm font-normal">
                                <Image
                                  src="/chevron-right.svg"
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="w-3 h-3"
                                />
                              </div>
                            )}
                            {part.trim()}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.labels.map((label) => (
                          <span
                            key={label.id}
                            className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${label.color}15`,
                              color: label.color,
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#0F172A]">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-normal text-[#475569]">
                        {getTimeAgo(item.updatedAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenActionMenuId(
                              openActionMenuId === item.id ? null : item.id
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Image
                            src="/more-vertical.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="w-5 h-5"
                          />
                        </button>
                        {openActionMenuId === item.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenActionMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                              <div className="py-1">
                                <Link
                                  href={`/inventory/${item.id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => setOpenActionMenuId(null)}
                                >
                                  View Details
                                </Link>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => setOpenActionMenuId(null)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => setOpenActionMenuId(null)}
                                >
                                  Duplicate
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => setOpenActionMenuId(null)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
              <div className="text-xs sm:text-sm font-normal text-[#475569]">
                Showing <span className="font-medium">1-{items.length}</span> of{" "}
                <span className="font-medium">{total}</span> items
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 h-9 w-9 text-sm text-[#334155] opacity-50 bg-white border border-[#CBD5E1] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Image
                    src="/chevron-left.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="w-4 h-4"
                  />
                </button>
                {[1, 2, 3, "...", totalPages].map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNum === "number" && setCurrentPage(pageNum)
                    }
                    className={`px-4 py-2 h-10 text-sm rounded-lg ${
                      pageNum === currentPage
                        ? "bg-[#3B82F6] text-white"
                        : "text-[#334155] bg-white border border-[#CBD5E1] hover:bg-gray-50"
                    } ${
                      pageNum === "..."
                        ? "cursor-default border-0 hover:bg-white"
                        : ""
                    }`}
                    disabled={pageNum === "..."}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 h-9 w-9 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Image
                    src="/chevron-right.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="w-3 h-3"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
