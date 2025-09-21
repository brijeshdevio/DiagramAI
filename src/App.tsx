import { useState } from "react";
import Mermaid from "./components/Mermaid";

window.addEventListener("unhandledrejection", (event) => {
  console.error("🔴 Unhandled promise rejection:", event.reason);
});

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("flowchart TD\nA-->B\nB-->C");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/diagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      if (data?.response) {
        const sanitized = data?.response
          ?.replaceAll("```mermaid", "")
          ?.replaceAll("```", "");
        setCode(sanitized);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 text-white p-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold tracking-wider">
          AI Diagram Generator 🚀
        </h1>
      </header>

      {/* Hero Section: Input + Output */}
      <main className="flex flex-col lg:flex-row p-6 gap-6 max-w-7xl mx-auto">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col gap-3 transition-transform hover:scale-[1.01]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              rows={4}
              placeholder="Type your diagram description..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`mt-2 px-6 py-2 rounded-md text-white font-semibold transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
                }`}
            >
              {loading ? "Generating..." : "Generate Diagram"}
            </button>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col gap-2 flex-1 overflow-auto transition-transform hover:scale-[1.01]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-purple-700">Mermaid Code</h2>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
              >
                Copy Code
              </button>
            </div>
            <pre className="text-sm overflow-x-auto text-gray-700">{code}</pre>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-4 bg-white rounded-xl shadow-lg flex flex-col items-center justify-start transition-transform hover:scale-[1.01]">
          <div className="flex justify-between w-full mb-2">
            <h2 className="font-semibold text-pink-700">Diagram Preview</h2>
            <button className="text-sm px-2 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition">
              Fullscreen
            </button>
          </div>
          <div className="w-full max-h-[500px] border rounded-lg bg-gray-100 flex items-center justify-center p-2 overflow-scroll shadow-inner ">
            <Mermaid chart={code} />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold text-purple-700 mb-2">
              Fast AI Generation
            </h3>
            <p>Generate diagrams in seconds using cutting-edge AI models.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold text-pink-700 mb-2">
              Interactive Preview
            </h3>
            <p>Edit, copy, and visualize diagrams live in the preview panel.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-yellow-100 to-purple-100 rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold text-yellow-700 mb-2">
              Export & Share
            </h3>
            <p>
              Copy Mermaid code, export PNG/SVG, or share diagrams with your
              team.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-xl shadow-inner mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold mb-2">1. Describe</h3>
            <p>Type your diagram description in natural language.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold mb-2">2. Generate</h3>
            <p>AI converts your description into Mermaid diagram code.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition transform">
            <h3 className="font-semibold mb-2">3. Preview & Export</h3>
            <p>See the live preview and copy/export your diagram.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-600 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
        &copy; 2025 AI Diagram Generator | Built with ❤️
      </footer>
    </div>
  );
}
