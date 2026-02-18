import VideoUploader from "@/components/VideoUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Swim Stroke Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Upload your swimming video and get AI-powered feedback on your stroke form
          </p>
        </header>
        
        <VideoUploader />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Built for competitive swimmers • MVP Version</p>
        </footer>
      </div>
    </main>
  );
}
