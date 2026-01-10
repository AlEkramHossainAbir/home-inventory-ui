"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600">Profile page coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
