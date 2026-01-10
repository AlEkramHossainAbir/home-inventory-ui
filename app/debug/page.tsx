"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [authInfo, setAuthInfo] = useState<{
    authToken: string | null;
    attachmentToken: string | null;
    tokenExpiry: string | null;
  }>({
    authToken: null,
    attachmentToken: null,
    tokenExpiry: null,
  });

  useEffect(() => {
    setAuthInfo({
      authToken: localStorage.getItem("authToken"),
      attachmentToken: localStorage.getItem("attachmentToken"),
      tokenExpiry: localStorage.getItem("tokenExpiry"),
    });
  }, []);

  const testDirectAPI = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found!");
      return;
    }

    try {
      console.log("Testing direct API call with token:", token.substring(0, 20) + "...");
      
      const response = await fetch("http://4.213.57.100:3100/api/v1/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      alert(`Status: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  const testProxyAPI = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found!");
      return;
    }

    try {
      console.log("Testing proxy API call with token:", token.substring(0, 20) + "...");
      
      const response = await fetch("/api/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      alert(`Status: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Token Information</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Stored Tokens</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Auth Token:</label>
              <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-300 font-mono text-xs break-all">
                {authInfo.authToken || "None"}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Attachment Token:</label>
              <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-300 font-mono text-xs break-all">
                {authInfo.attachmentToken || "None"}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Token Expiry:</label>
              <div className="mt-1 p-3 bg-gray-50 rounded border border-gray-300 font-mono text-xs">
                {authInfo.tokenExpiry || "None"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test API Calls</h2>
          
          <div className="flex gap-4">
            <button
              onClick={testDirectAPI}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Direct API (CORS)
            </button>
            
            <button
              onClick={testProxyAPI}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Test Proxy API
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Open browser console (F12) to see detailed logs
          </p>
        </div>
      </div>
    </div>
  );
}
