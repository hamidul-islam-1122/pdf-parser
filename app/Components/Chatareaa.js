"use client";

import { useEffect, useState } from "react";

const Chatareaa = () => {
  const [pdfjsLib, setPdfjsLib] = useState(null);
  const [summary, setsummary] = useState("");
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const loadPdfJs = async () => {
      const pdfjs = await import("pdfjs-dist/build/pdf");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfjsLib(pdfjs);
    };

    loadPdfJs();
  }, []);
const sendText = (text) => {
  setloading(true)
  setsummary("");
  fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .then((data) => {
    
      setsummary(data.summary);
    })
    .catch((err) => console.error(err))
    .finally(() => setloading(false))
    
  };
  
  const handleFileRead = (e) => {
    const filearray = new Uint8Array(e.target.result);

    pdfjsLib.getDocument({ data: filearray }).promise.then((pdf) => {
      console.log("Pages:", pdf.numPages);

      pdf.getPage(1).then((page) => {
        page.getTextContent().then((textContent) => {
          const text = textContent.items.map((item) => item.str).join(" ");
          sendText(text);
        });
      });
    });
  };

  const InputChange = (e) => {
    if (!pdfjsLib) return;

    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = handleFileRead;
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col-reverse">
      <div className="flex justify-center">
        <input
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          onChange={InputChange}
          accept="application/pdf"
        />
      </div>

      {loading ? <p className="p-3">Loading...</p> : <p className="p-3">{summary}</p>}
    </div>
  );
};

export default Chatareaa;