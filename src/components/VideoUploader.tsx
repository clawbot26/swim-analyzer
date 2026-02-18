"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function VideoUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a video file (MP4, MOV, etc.)");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File too large. Max 100MB.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      
      localStorage.setItem("swimAnalysis", JSON.stringify(data));
      router.push("/results");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400"
        } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <p className="text-lg text-gray-700 mb-2">
          {isDragging ? "Drop your video here" : "Drag and drop your swim video"}
        </p>
        <p className="text-sm text-gray-500 mb-6">or</p>

        <label className="inline-block">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <span className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors inline-block">
            Select Video File
          </span>
        </label>

        <p className="text-xs text-gray-400 mt-4">
          MP4, MOV, AVI up to 100MB
        </p>
      </div>

      {isUploading && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Analyzing your stroke...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
