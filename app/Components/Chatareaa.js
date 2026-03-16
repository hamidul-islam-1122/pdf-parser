"use client";

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
const Chatareaa = () => {
  const InputChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = handleFileRead;
    fileReader.readAsArrayBuffer(file);
  };

  function handleFileRead(e) {
    const filearray = new Uint8Array(e.target.result);
    pdfjsLib.getDocument({ data: filearray }).promise.then(function (pdf) {
      console.log("the pdf has ", pdf.numPages, "page(s).");
      pdf.getPage(1).then(function (page) {
        page.getTextContent().then(function (textContent) {
          const text = textContent.items.map(item => item.str).join(' ');
          console.log("Page 1 text:", text);
        });
      });
    });
  }
  return (
    <>
      <input
  type="file"
  onChange={InputChange}
  accept="application/pdf"
/>
    </>
  );
};

export default Chatareaa;
