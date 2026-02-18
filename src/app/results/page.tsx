"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AnalysisResult {
  strokeType: string;
  tempo: string;
  speed: string;
  tips: string[];
  timestamp: string;
}

export default function Results() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("swimAnalysis");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No analysis found. Upload a video first.</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Upload Video
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-600">
            Here is what we detected from your swim video
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Stroke Type</p>
              <p className="text-2xl font-bold text-blue-700">{analysis.strokeType}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Tempo</p>
              <p className="text-2xl font-bold text-blue-700">{analysis.tempo}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Est. Speed</p>
              <p className="text-2xl font-bold text-blue-700">{analysis.speed}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Improvement Tips
            </h2>
            <ul className="space-y-3">
              {analysis.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Analyze Another Video
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Note: This MVP uses simulated analysis. Full AI vision integration coming soon.
        </p>
      </div>
    </main>
  );
}
