import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    const mermaidDiv = document.createElement("div");
    mermaidDiv.className = "mermaid";

    try {
      // ✅ Validate syntax BEFORE adding to DOM
      mermaid.initialize({ startOnLoad: false });
      mermaid.parse(chart); // throws if invalid

      // ✅ Safe to insert and render
      mermaidDiv.innerHTML = chart;
      containerRef.current.appendChild(mermaidDiv);

      // ✅ Use setTimeout to handle Mermaid's async rendering quirks
      setTimeout(() => {
        try {
          mermaid.init(undefined, mermaidDiv);
        } catch (renderErr) {
          console.error("❌ Mermaid rendering failed:", renderErr);
          mermaidDiv.innerHTML = `<pre style="color: red;">${
            (renderErr as Error).message
          }</pre>`;
        }
      }, 0);
    } catch (parseErr) {
      console.error("❌ Mermaid parsing failed:", parseErr);
      mermaidDiv.innerHTML = `<pre style="color: red;">${
        (parseErr as Error).message
      }</pre>`;
      containerRef.current.appendChild(mermaidDiv);
    }
  }, [chart]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Mermaid;
